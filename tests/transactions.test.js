import request from "supertest";
import { describe, it, beforeAll, afterAll, expect, beforeEach } from "vitest";
import App from "../index.js";

import Accounts from "../models/accounts.js";
import mongoose from "mongoose";
import Transactions from "../models/transactions.js";
import {Double} from "mongodb"; // adjust path

describe("Transactions Controller", () => {
  let app;
  beforeAll(async () => {
    app = await App();
  })

  afterAll(() => {
    Accounts.deleteMany({})
      .then(() => {
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error);
      });

    Transactions.deleteMany({})
      .then(() => {
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error);
      });
  });


  it("should return transactions summary and details for a user", async () => {
    const account = await Accounts.create({
      name: "Alice",
      email: "alice@example.com",
      balance: 1000,
    });

    // Create deposit and withdrawal transactions
    const depositTx = await Transactions.create({
      accountId: account._id,
      transactionType: "deposit",
      amount: 500,
      balance: 1500,
    });

    const withdrawTx = await Transactions.create({
      accountId: account._id,
      transactionType: "withdraw",
      amount: 200,
      balance: 800,
    });

    const res = await request(app).get(`/api/v1/transactions/all-transactions/${account.email}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("summary");
    expect(res.body).toHaveProperty("transactionsDetails");

    expect(res.body.summary).toMatchObject({
      accountId: account._id.toString(),
      totalDeposits: 500,
      totalWithdrawals: 200,
    });

    expect(Array.isArray(res.body.transactionsDetails)).toBe(true);
    expect(res.body.transactionsDetails.length).toBe(2);

    // IDs match
    const txIds = res.body.transactionsDetails.map((tx) => tx._id);
    expect(txIds).toContain(depositTx._id.toString());
    expect(txIds).toContain(withdrawTx._id.toString());
  });

  it("should return 404 if account not found", async () => {
    const res = await request(app).get("/api/v1/transactions/all-transactions/nonexistent@example.com");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Account not found");
  });

  it("should return 404 if no transactions found", async () => {
    const account = await Accounts.create({
      name: "Bob",
      email: "bob@example.com",
      balance: 0,
    });

    // No transactions created for Bob
    const res = await request(app).get(`/api/v1/transactions/all-transactions/${account.email}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Transactions not found");
  });

  it("should return transaction details by ID", async () => {
    const account = await Accounts.create({
      name: "Charlie",
      email: "charlie@example.com",
      balance: 300,
    });

    const tx = await Transactions.create({
      accountId: account._id,
      transactionType: "deposit",
      amount: 300,
      balance: 600,
    });

    const res = await request(app).get(`/api/v1/transactions/transaction-details/${tx._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", tx._id.toString());
    expect(res.body.transactionType).toBe("deposit");
    expect(res.body.amount).toBe(300);
  });

  it("should return 404 if transaction not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/v1/transactions/transaction-details/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Transaction not found");
  });

})