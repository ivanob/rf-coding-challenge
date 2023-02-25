// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type {
  Notifications,
  NotificationsData,
  NotificationsPatch,
  NotificationsQuery
} from './notifications.schema'

export type { Notifications, NotificationsData, NotificationsPatch, NotificationsQuery }

export interface NotificationsParams extends MongoDBAdapterParams<NotificationsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class NotificationsService<ServiceParams extends Params = NotificationsParams> extends MongoDBService<
  Notifications,
  NotificationsData,
  ServiceParams,
  NotificationsPatch
> {
  create(data: any, params?: ServiceParams | undefined): Promise<any>{
    // Custom code to add the date in the timestamp any time I create a notification
    return this._create({...data, timestamp: Date.now()})
  }
  
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('notifications'))
  }
}
