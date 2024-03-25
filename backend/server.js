import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoutes.js";
import { postRoutes } from "./routes/postRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { dbConnect } from "./config/dbConfig.js";
import path from "path";

dbConnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("server listen to port " + port));
