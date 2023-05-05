import { Schema, Model, Document } from "mongoose";
import { MongoDbConnections } from "../MongoDbConnections";
import { CollectionNames } from "../CollectionNames";
import { MongoTimestampI, MongoUtils } from "../MongoUtils";

export interface IUserEntity extends Document, MongoTimestampI {
  firstName?: string;
  lastName?: string;
  userName?: string;
  emailId: string;
  passwordHash: string;
}

export const UserSchema: Schema = new Schema<IUserEntity>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: false },
    emailId: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

MongoUtils.runValidatorForSchema(UserSchema);

let model: Model<IUserEntity> | undefined;

export const UserModel = (): Model<IUserEntity> => {
  if (!model) {
    model = MongoDbConnections.OaktreeApps.getConnection().model(
      CollectionNames.UserCollection,
      UserSchema
    );
  }

  return model;
};
