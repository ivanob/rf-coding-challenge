// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Admin, AdminData, AdminPatch, AdminQuery } from './admin.schema'
import axios from 'axios'
import { MongoClient } from 'mongodb';
import { app } from '../../app'

export type { Admin, AdminData, AdminPatch }

export interface AdminServiceOptions {
  app: Application
}

const playersJSON_URL = 'https://raw.githubusercontent.com/RealFevr/challenge/master/data/players.json';
export interface AdminParams extends Params<AdminQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AdminService<ServiceParams extends Params = AdminParams>
  implements ServiceInterface<Admin, AdminData, ServiceParams, AdminPatch>
{
  constructor(public options: AdminServiceOptions) {}

  async patch(id: NullableId, data: AdminPatch, _params?: ServiceParams): Promise<Admin> {
    if(_params?.user?.role !== 'admin'){
      throw Error(
        'Authorisation error: User authenticated must be admin to perform this operation'
      )
    }
    const mongoURL = app.get('mongodb') || ''
    const db = await (await MongoClient.connect(mongoURL)).db('test');
    if(data?.fetchData){
      console.log('Admin has asked to fetch the database of players from an external resource');
      const players = await axios.get(playersJSON_URL);
      const flattened = (players.data.data.teams.flatMap((t: any) => t.players));
      db.collection('players').insertMany(flattened);
    }
    if(data?.removeOldNotifs){
      // 1 week = 604800 seconds = 604800000 miliseconds
      console.log('Admin has asked to remove notifications older than 1 week');
      db.collection('notifications').deleteMany({timestamp: {$lt: Date.now() - 604800000}})
    }
    
    return {
      fetchData: data?.fetchData ?  data?.fetchData : false,
      removeOldNotifs: data?.removeOldNotifs ?  data?.removeOldNotifs : false,
    };
  }

}

export const getOptions = (app: Application) => {
  return { app }
}
