import { Schema, Model, Document } from "mongoose";
import { MongoDbConnections } from "../MongoDbConnections";
import { CollectionNames } from "../CollectionNames";
import { MongoTimestampI, MongoUtils } from "../MongoUtils";

export interface IXXXXXEntity extends Document, MongoTimestampI {
  name: string;
  description: string;
  image: string;
}

export const XXXXXSchema: Schema = new Schema<IXXXXXEntity>(
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

MongoUtils.runValidatorForSchema(XXXXXSchema);

let model: Model<IXXXXXEntity> | undefined;

export const CategoryModel = (): Model<IXXXXXEntity> => {
  if (!model) {
    model = MongoDbConnections.OaktreeApps.getConnection().model(
      CollectionNames.CategoryCollection,
      XXXXXSchema
    );
  }

  return model;
};
