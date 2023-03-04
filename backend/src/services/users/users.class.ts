// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { AdapterId, MongoDBService, NullableAdapterId } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { User, UserData, UserQuery } from './users.schema'

export type { User, UserData, UserQuery }

export interface UserParams extends MongoDBAdapterParams<UserQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends MongoDBService<
  User,
  UserData,
  ServiceParams
> {

  create(data: any, params?: ServiceParams | undefined): Promise<any>{
    return this._create({...data, subscribedPlayers: []});
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users')),
    multi: true
  }
}
