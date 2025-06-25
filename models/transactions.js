import mongoose from "mongoose";
import {Double} from "mongodb";
import {TransactionsTypes} from "./enums.js";

const transactionsSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    required: true,
    enum: Object.values(TransactionsTypes)
  },
  amount: {
    type: Double,
    required: true,
  },
  balance: {
    type: Double,
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
}, {
  timestamps: true
});

const transactions = mongoose.model("transactions", transactionsSchema);

export default transactions;