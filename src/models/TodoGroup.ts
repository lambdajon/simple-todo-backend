import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { IUser } from "./User";
import { ITodo } from "./Todo";
export interface ITodoGroup extends Document {
  name: string;
  author: IUser;
  todos: ITodo[];
}

const TodoGrouopSchema: any = new Schema(
  {
    name: {
      type: String,
      text: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
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

export default mongoose.model<ITodoGroup>("TodoGroup", TodoGrouopSchema);
