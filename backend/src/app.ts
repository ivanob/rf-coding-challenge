// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logError } from './hooks/log-error'
import { mongodb } from './mongodb'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'
import socketio from '@feathersjs/socketio'

const app: Application = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

// Configure services and transports
app.configure(rest())
app.configure(mongodb)
app.configure(authentication)
app.configure(services)
app.configure(channels)
app.configure(
  socketio(
    3031,
    {
      cors: {
        origin: app.get('origins')
      }
    },
    (io) => {
      console.log('Feathers websocket listening on http://localhost:3031')
      io.on('connection', (socket) => {
        // Do something here
        console.log(`Client with ID=${socket.id} connected via websocket`);
        socket.on('subscribe', (userId: string, playerId: string) => {
          console.log(`The client with ID=${userId} has subscribed to player=${playerId}`)
        })
      })
    }
  )
)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
