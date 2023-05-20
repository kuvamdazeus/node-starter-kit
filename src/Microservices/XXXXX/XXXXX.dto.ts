import { IsNotEmpty, IsString, IsMongoId, IsOptional } from "class-validator";
import "reflect-metadata";
import {z} from 'zod'

export const createXXXXXDto = z.object({
  /*ZOD_FIELDS*/
})

export const updateXXXXXDto = createXXXXXDto.extend({
  id: z.string().nonempty(),
})

export const deleteXXXXXDto = z.object({
  id: z.string().nonempty(),
})

export const getXXXXXByIdDto = z.object({
  entityId: z.string().nonempty(),
})

export interface XXXXXI {
  /*INTERFACE_FIELDS*/
}

export type CreateXXXXXDto = z.infer<typeof createXXXXXDto>
export type UpdateXXXXXDto = z.infer<typeof updateXXXXXDto>
export type DeleteXXXXXDto = z.infer<typeof deleteXXXXXDto>
export type GetXXXXXByIdDto = z.infer<typeof getXXXXXByIdDto>