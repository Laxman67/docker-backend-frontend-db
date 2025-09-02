import app from "./app.js";
import connectDB from "./config/DBConnect.js";
import { configDotenv } from "dotenv";
configDotenv();
await connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
