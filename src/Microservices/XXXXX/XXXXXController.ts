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
  CategoryModel,
  IXXXXXEntity,
} from "@/Database/Entities/XXXXXEntity";

const tag = "XXXXController";

export const CategoryController = {
  async index(): Promise<ApiResponseI> {
    try {
      const categoryList = await CategoryModel().find().sort({ orderNo: 1 });

      const data: XXXXXI[] = categoryList.map((category) =>
        this.getCategoryResponseDto(category)
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
        await CategoryModel().findOne({
          name,
        });

      if (existingCategoryWithSameName) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Category with this name already exists",
        };
      }

      const newCategory = new (CategoryModel())({
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

      const category = await CategoryModel().findById(id);

      if (!category) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "No Such Category Found",
        };
      }

      const existingCategoryWithSameName: IXXXXXEntity | null =
        await CategoryModel().findOne({
          name,
          _id: { $ne: id },
        });

      if (existingCategoryWithSameName) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Category with this name already exists",
        };
      }

      const updatedCategory = await CategoryModel().findOneAndUpdate(
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

      const data: XXXXXI = this.getCategoryResponseDto(updatedCategory);

      Logger.info({
        message: "Category Updated Successfully",
        data,
        tag,
      });

      return {
        status: HttpStatusCodes.OK,
        message: "category Updated",
      };
    } catch (error) {
      Logger.warn({ message: "Category update Failed", error, tag });
      throw error;
    }
  },

  async destroy(input: DeleteXXXXXDto): Promise<ApiResponseI> {
    try {
      const { id } = input;

      const mapping = await CategoryModel().findOneAndDelete({
        _id: id,
      });

      if (!mapping) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "This category doesn't exist",
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

  async getCategoryById(categoryId: string): Promise<ApiResponseI> {
    const category = await CategoryModel().findOne({ _id: categoryId });

    if (!category) {
      return {
        status: HttpStatusCodes.NOT_FOUND,
        message: "Not Found",
      };
    }

    const data: XXXXXI = this.getCategoryResponseDto(category);

    return {
      status: HttpStatusCodes.OK,
      message: "Category Data",
      data,
    };
  },

  getCategoryResponseDto(category: IXXXXXEntity): XXXXXI {
    return {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      image: category.image,
    };
  },
};
