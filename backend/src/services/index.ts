import { notifications } from './notifications/notifications'
import { admin } from './admin/admin'
import { players } from './players/players'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(notifications)
  app.configure(admin)
  app.configure(players)
  app.configure(user)
  // All services will be registered here
}
