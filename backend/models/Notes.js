import { Schema, model } from "mongoose";

const notesSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Notes = model("Notes", notesSchema);

export default Notes;
