import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { IUser } from "./User";
import { ITodoGroup } from "./TodoGroup";
export interface ITodo extends Document {
  name: string;
  description: string;
  author: IUser;
  group: ITodoGroup;
}

const TodoSchema: any = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "TodoGroup",
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

export default mongoose.model<ITodo>("Todo", TodoSchema);
