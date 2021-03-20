import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { IUser } from "./User";
export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  lastName: string;
  user: IUser;
  expiredAt: number;
}

const TokenSchema: any = new Schema(
  {
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expiredAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model<IToken>("Token", TokenSchema);
