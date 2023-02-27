// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator } from '../../validators'

// Main data model schema
export const adminSchema = {
  $id: 'Admin',
  type: 'object',
  additionalProperties: false,
  required: ['fetchData', 'removeOldNotifs'],
  properties: {
    fetchData: {
      type: 'boolean'
    },
    removeOldNotifs: {
      type: 'boolean'
    }
  }
} as const
export type Admin = FromSchema<typeof adminSchema>
export const adminValidator = getValidator(adminSchema, dataValidator)
export const adminResolver = resolve<Admin, HookContext>({})

// export const adminExternalResolver = resolve<Admin, HookContext>({})

// Schema for creating new data
export const adminDataSchema = {
  $id: 'AdminData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: {
      type: 'string'
    }
  }
} as const
export type AdminData = FromSchema<typeof adminDataSchema>
// export const adminDataValidator = getValidator(adminDataSchema, dataValidator)
// export const adminDataResolver = resolve<AdminData, HookContext>({})

// Schema for updating existing data
export const adminPatchSchema = {
  $id: 'AdminPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...adminSchema.properties
  }
} as const
export type AdminPatch = FromSchema<typeof adminPatchSchema>
export const adminPatchValidator = getValidator(adminPatchSchema, dataValidator)
export const adminPatchResolver = resolve<AdminPatch, HookContext>({})

// Schema for allowed query properties
export const adminQuerySchema = {
  $id: 'AdminQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(adminSchema.properties)
  }
} as const
export type AdminQuery = FromSchema<typeof adminQuerySchema>
// export const adminQueryValidator = getValidator(adminQuerySchema, queryValidator)
// export const adminQueryResolver = resolve<AdminQuery, HookContext>({})
