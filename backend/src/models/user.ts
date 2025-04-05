import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  team: string;
  teamId: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 30,
    minlength: 3,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  team: {
    type: String,
    trim: true,
    default: "",
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
});

const userModel = model<User>("User", userSchema);

export default userModel;
