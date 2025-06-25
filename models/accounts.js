import mongoose from "mongoose";
import {Double} from "mongodb";

const accountsSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

const accounts = mongoose.model("accounts", accountsSchema);

export default accounts;