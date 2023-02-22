// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Admin, AdminData, AdminPatch, AdminService } from './admin.class'

export type { Admin, AdminData, AdminPatch }

export type AdminClientService = Pick<AdminService<Params<AdminPatch>>, (typeof adminMethods)[number]>

export const adminPath = 'admin'

export const adminMethods = ['patch'] as const

export const adminClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(adminPath, connection.service(adminPath), {
    methods: adminMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [adminPath]: AdminClientService
  }
}
