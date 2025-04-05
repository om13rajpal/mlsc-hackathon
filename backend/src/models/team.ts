import { Document, model, Schema } from "mongoose";

export interface Team extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
  score: number;
  membersName: string[];
  repoLink: string;
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
  score: {
    type: Number,
    default: 0,
  },
  membersName: {
    type: [String],
    default: [],
  },
  repoLink: {
    type: String,
    default: "",
  },
});

const teamModel = model<Team>("Team", teamSchema);

export default teamModel;
