// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const playersSchema = Type.Object(
  {
    _id: Type.String({ objectid: true }),
    name: Type.String(),
    number: Type.Number(),
    nationality: Type.String(),
    age: Type.Number(),
    position: Type.String()
  },
  { $id: 'Players', additionalProperties: false }
)
export type Players = Static<typeof playersSchema>
export const playersValidator = getValidator(playersSchema, dataValidator)
export const playersResolver = resolve<Players, HookContext>({})

export const playersExternalResolver = resolve<Players, HookContext>({})

// Schema for creating new entries
export const playersDataSchema = Type.Pick(playersSchema, ['number', 'nationality', 'age', 'position'], {
  $id: 'PlayersData'
})
export type PlayersData = Static<typeof playersDataSchema>
export const playersDataValidator = getValidator(playersDataSchema, dataValidator)
export const playersDataResolver = resolve<Players, HookContext>({})

// Schema for updating existing entries
export const playersPatchSchema = Type.Partial(playersDataSchema, {
  $id: 'PlayersPatch'
})
export type PlayersPatch = Static<typeof playersPatchSchema>
export const playersPatchValidator = getValidator(playersPatchSchema, dataValidator)
export const playersPatchResolver = resolve<Players, HookContext>({})

// Schema for allowed query properties
export const playersQueryProperties = Type.Pick(playersSchema, ['_id', 'name'])
export const playersQuerySchema = Type.Intersect(
  [
    querySyntax(playersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayersQuery = Static<typeof playersQuerySchema>
export const playersQueryValidator = getValidator(playersQuerySchema, queryValidator)
export const playersQueryResolver = resolve<PlayersQuery, HookContext>({})
