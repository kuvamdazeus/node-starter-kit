/* eslint-disable indent */
import { HttpStatusCodes } from "../../CommonConstants";
import { ApiResponseI } from "../../CommonHttpServer/ResponseHandler";
import { Logger } from "../../Utils/Logger";
import {
  XXXXXI,
  CreateXXXXXDto,
  DeleteXXXXXDto,
  UpdateXXXXXDto,
} from "./XXXXX.dto";
import {
  XXXXXModel,
  IXXXXXEntity,
} from "@/Database/Entities/XXXXXEntity";

const tag = "XXXXController";

export const XXXXXController = {
  async index(): Promise<ApiResponseI> {
    try {
      const entityList = await XXXXXModel().find().sort({ orderNo: 1 });

      const data: XXXXXI[] = entityList.map((entity) =>
        this.getEntityResponseDto(entity)
      );

      return {
        status: HttpStatusCodes.OK,
        message: "Category List",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "Category List", error, tag });
      throw error;
    }
  },

  async create(input: CreateXXXXXDto): Promise<ApiResponseI> {
    try {
      const { name, description, image } = input;

      const existingCategoryWithSameName: IXXXXXEntity | null =
        await XXXXXModel().findOne({
          name,
        });

      if (existingCategoryWithSameName) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Category with this name already exists",
        };
      }

      const newCategory = new (XXXXXModel())({
        name,
        image,
        description,
      });

      await newCategory.save();

      return {
        status: HttpStatusCodes.OK,
        message: "Category Created successfully",
      };
    } catch (error) {
      Logger.warn({ message: "Create Category", error, tag });
      throw error;
    }
  },

  async update(input: UpdateXXXXXDto): Promise<ApiResponseI> {
    try {
      const { id, name, description, image } = input;

      const entity = await XXXXXModel().findById(id);

      if (!entity) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "No Such Category Found",
        };
      }

      const existingCategoryWithSameName: IXXXXXEntity | null =
        await XXXXXModel().findOne({
          name,
          _id: { $ne: id },
        });

      if (existingCategoryWithSameName) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Category with this name already exists",
        };
      }

      const updatedCategory = await XXXXXModel().findOneAndUpdate(
        { _id: id },
        {
          name,
          image,
          description,
        }
      );

      if (!updatedCategory) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "Not Found",
        };
      }

      const data: XXXXXI = this.getEntityResponseDto(updatedCategory);

      Logger.info({
        message: "Category Updated Successfully",
        data,
        tag,
      });

      return {
        status: HttpStatusCodes.OK,
        message: "entity Updated",
      };
    } catch (error) {
      Logger.warn({ message: "Category update Failed", error, tag });
      throw error;
    }
  },

  async destroy(input: DeleteXXXXXDto): Promise<ApiResponseI> {
    try {
      const { id } = input;

      const mapping = await XXXXXModel().findOneAndDelete({
        _id: id,
      });

      if (!mapping) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "This entity doesn't exist",
        };
      }

      Logger.info({ message: "Category Deleted", data: { id }, tag });
      return {
        status: HttpStatusCodes.OK,
        message: "Category Deleted",
      };
    } catch (error) {
      Logger.warn({ message: "DeleteCategory Failed", error, tag });
      throw error;
    }
  },

  async getEntityById(entityId: string): Promise<ApiResponseI> {
    const entity = await XXXXXModel().findOne({ _id: entityId });

    if (!entity) {
      return {
        status: HttpStatusCodes.NOT_FOUND,
        message: "Not Found",
      };
    }

    const data: XXXXXI = this.getEntityResponseDto(entity);

    return {
      status: HttpStatusCodes.OK,
      message: "Category Data",
      data,
    };
  },

  getEntityResponseDto(entity: IXXXXXEntity): XXXXXI {
    return {
      id: entity._id.toString(),
      name: entity.name,
      description: entity.description,
      image: entity.image,
    };
  },
};
