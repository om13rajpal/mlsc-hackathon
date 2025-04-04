import { Document, model, Schema } from "mongoose";

export interface Team extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const teamSchema = new Schema<Team>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const teamModel = model<Team>("Team", teamSchema);

export default teamModel;
