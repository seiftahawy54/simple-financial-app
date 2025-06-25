import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./misc/swagger.js";
import routes from "./routes/index.js";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"]
}));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", routes);

export const db = () => mongoose.connect(process.env.MONGO_URL);

export default async () => {
  try {
    await db();
    return app.listen(process.env.PORT, () => {
      console.log(`Server started at ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
