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
  // patch(id: unknown, data: unknown, params?: unknown): Promise<any> {
  //   console.log('LOG1', data)
  //   console.log('LOG2', id)
  //   console.log('LOG3', params)
  //   this._patch()
  //   return new Promise(() => {})
  // }

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
