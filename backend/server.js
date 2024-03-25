import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { dbConnect } from "./config/dbConfig.js";

dbConnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("server listen to port " + port));
