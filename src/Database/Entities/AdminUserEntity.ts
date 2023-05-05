import { Schema, Model, Document } from "mongoose";
import { MongoDbConnections } from "../MongoDbConnections";
import { CollectionNames } from "../CollectionNames";
import { MongoTimestampI, MongoUtils } from "../MongoUtils";

export interface IAdminUserEntity extends Document, MongoTimestampI {
  emailId: string;
  passwordHash: string;
  userName: string;
}

export const AdminUserSchema: Schema = new Schema(
  {
    emailId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

MongoUtils.runValidatorForSchema(AdminUserSchema);

let model: Model<IAdminUserEntity> | undefined;

export const AdminUserModel = (): Model<IAdminUserEntity> => {
  if (!model) {
    model = MongoDbConnections.OaktreeApps.getConnection().model(
      CollectionNames.AdminUserCollection,
      AdminUserSchema
    );
  }
  return model;
};
