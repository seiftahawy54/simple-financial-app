import mongoose from "mongoose";
import {Double} from "mongodb";

const accounts = mongoose.model("accounts", {
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  balance: {
    type: Double,
    default: 0,
    index: true,
  },
});

export default accounts;