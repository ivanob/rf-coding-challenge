// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  playersDataValidator,
  playersPatchValidator,
  playersQueryValidator,
  playersResolver,
  playersExternalResolver,
  playersDataResolver,
  playersPatchResolver,
  playersQueryResolver
} from './players.schema'

import type { Application } from '../../declarations'
import { PlayersService, getOptions } from './players.class'
import { playersPath, playersMethods } from './players.shared'

export * from './players.class'
export * from './players.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const players = (app: Application) => {
  // Register our service on the Feathers application
  app.use(playersPath, new PlayersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: playersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(playersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(playersExternalResolver),
        schemaHooks.resolveResult(playersResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(playersQueryValidator), schemaHooks.resolveQuery(playersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(playersDataValidator), schemaHooks.resolveData(playersDataResolver)],
      patch: [schemaHooks.validateData(playersPatchValidator), schemaHooks.resolveData(playersPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [playersPath]: PlayersService
  }
}
