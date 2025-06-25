import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


export default async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server started at ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
