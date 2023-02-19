// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Players, PlayersData, PlayersPatch, PlayersQuery, PlayersService } from './players.class'

export type { Players, PlayersData, PlayersPatch, PlayersQuery }

export type PlayersClientService = Pick<PlayersService<Params<PlayersQuery>>, (typeof playersMethods)[number]>

export const playersPath = 'players'

export const playersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const playersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(playersPath, connection.service(playersPath), {
    methods: playersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [playersPath]: PlayersClientService
  }
}
