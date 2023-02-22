// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  adminPatchValidator,
  adminPatchResolver
} from './admin.schema'

import type { Application } from '../../declarations'
import { AdminService, getOptions } from './admin.class'
import { adminPath, adminMethods } from './admin.shared'

export * from './admin.class'
export * from './admin.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const admin = (app: Application) => {
  // Register our service on the Feathers application
  app.use(adminPath, new AdminService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: adminMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(adminPath).hooks({
    around: {
      all: [
        authenticate('jwt')
      ]
    },
    before: {
      all: [],
      patch: [schemaHooks.validateData(adminPatchValidator), schemaHooks.resolveData(adminPatchResolver)]
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
    [adminPath]: AdminService
  }
}
