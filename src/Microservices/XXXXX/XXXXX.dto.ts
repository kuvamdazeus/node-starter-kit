import { IsNotEmpty, IsString, IsMongoId, IsOptional } from "class-validator";
import "reflect-metadata";
import {z} from 'zod'

export const createXXXXXDto = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().optional(),
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
  id: string;
  name: string;
  description: string;
  image?: string;
}

export type CreateXXXXXDto = z.infer<typeof createXXXXXDto>
export type UpdateXXXXXDto = z.infer<typeof updateXXXXXDto>
export type DeleteXXXXXDto = z.infer<typeof deleteXXXXXDto>
export type GetXXXXXByIdDto = z.infer<typeof getXXXXXByIdDto>