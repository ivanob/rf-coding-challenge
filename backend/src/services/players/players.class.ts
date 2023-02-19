// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Players, PlayersData, PlayersPatch, PlayersQuery } from './players.schema'

export type { Players, PlayersData, PlayersPatch, PlayersQuery }

export interface PlayersParams extends MongoDBAdapterParams<PlayersQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PlayersService<ServiceParams extends Params = PlayersParams> extends MongoDBService<
  Players,
  PlayersData,
  ServiceParams,
  PlayersPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('players'))
  }
}
