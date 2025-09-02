import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import Notes from "./models/Notes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello from backend Part Docker and Kubernetes");
});

app.get("/api/notes", async (req, res) => {
  const notes = await Notes.find();

  res.status(200).json({ success: true, data: notes });
});

app.get("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(404).json({ success: false, message: "Server error" });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  console.log(req.body);

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }
  const newNote = new Notes({ title, content });
  await newNote.save();
  console.log(newNote);

  res.status(201).send("Note created successfully");
});

export default app;
