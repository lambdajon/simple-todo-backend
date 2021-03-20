import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";
export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  chats: string;
}

const UserSchema: any = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      hidden: true,
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

UserSchema.pre("save", async function (next: HookNextFunction) {
  try {
    if (this.password) {
      const salt: string = await genSalt(10);
      const hashedPassword: string = await hash(this.password, salt);
      if (hashedPassword) {
        this.password = hashedPassword;
      }
    }
    next();
  } catch (e) {
    next(e);
    throw new Error(`User password hashing error: ${e}`);
  }
});

export default mongoose.model<IUser>("User", UserSchema);
