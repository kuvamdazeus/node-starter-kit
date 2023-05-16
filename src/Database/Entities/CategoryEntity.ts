import { Schema, Model, Document } from "mongoose";
import { MongoDbConnections } from "../MongoDbConnections";
import { CollectionNames } from "../CollectionNames";
import { MongoTimestampI, MongoUtils } from "../MongoUtils";

export interface ICategoryEntity extends Document, MongoTimestampI {
  name: string;
  description: string;
  image: string;
}

export const UserSchema: Schema = new Schema<ICategoryEntity>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
    strict: true,
  }
);

MongoUtils.runValidatorForSchema(UserSchema);

let model: Model<ICategoryEntity> | undefined;

export const CategoryModel = (): Model<ICategoryEntity> => {
  if (!model) {
    model = MongoDbConnections.OaktreeApps.getConnection().model(
      CollectionNames.CategoryCollection,
      UserSchema
    );
  }

  return model;
};
