/* eslint-disable indent */
import { HttpStatusCodes } from "../../CommonConstants";
import { ApiResponseI } from "../../CommonHttpServer/ResponseHandler";
import { Logger } from "../../Utils/Logger";
import {
  CategoryI,
  CreateCategoryDto,
  DeleteCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from "./Category.dto";
import {
  CategoryModel,
  ICategoryEntity,
} from "../../Database/Entities/CategoryEntity";
import { GetUserProfileResponseI } from "../User/User.dto";

const tag = "XXXXController";

export const CategoryController = {
  async index(): Promise<ApiResponseI> {
    try {
      const categoryList = await CategoryModel().find().sort({ orderNo: 1 });

      const data: CategoryI[] = categoryList.map((category) =>
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

  async create(input: CreateCategoryDto): Promise<ApiResponseI> {
    try {
      const { name, description, image } = input;

      const existingCategoryWithSameName: ICategoryEntity | null =
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

  async update(input: UpdateCategoryDto): Promise<ApiResponseI> {
    try {
      const { id, name, description, image } = input;

      const category = await CategoryModel().findById(id);

      if (!category) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "No Such Category Found",
        };
      }

      const existingCategoryWithSameName: ICategoryEntity | null =
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

      const data: CategoryI = this.getCategoryResponseDto(updatedCategory);

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

  async destroy(input: DeleteCategoryDto): Promise<ApiResponseI> {
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

    const data: CategoryI = this.getCategoryResponseDto(category);

    return {
      status: HttpStatusCodes.OK,
      message: "Category Data",
      data,
    };
  },

  getCategoryResponseDto(category: ICategoryEntity): CategoryI {
    return {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      image: category.image,
    };
  },
};
