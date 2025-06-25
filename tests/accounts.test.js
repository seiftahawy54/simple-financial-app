import request from "supertest";
import { describe, it, beforeAll, afterAll, expect, beforeEach } from "vitest";
import App from "../index.js";

import Accounts from "../models/accounts.js";
import mongoose from "mongoose"; // adjust path

describe("Accounts Controller", () => {
  let app;
  beforeAll(async () => {
    app = await App();
  });

  afterAll(() => {
    Accounts.deleteMany({})
      .then(() => {
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  beforeEach(async () => {
  });

  // Test openAccount
  it("should open a new account", async () => {
    const res = await request(app).post("/api/v1/accounts/open-account").send({
      name: "John Doe",
      email: "john@example.com",
      balance: 100,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("john@example.com");
    expect(res.body.balance).toBe(100);
  });

  it("should not open account if email exists", async () => {
    await Accounts.create({ name: "Jane", email: "jane@example.com", balance: 50 });

    const res = await request(app).post("/api/v1/accounts/open-account").send({
      name: "Jane Dup",
      email: "jane@example.com",
      balance: 100,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Account already exists");
  });

  // Test depositFunds
  it("should deposit funds into account", async () => {
    await Accounts.create({ name: "Deposit User", email: "dep@example.com", balance: 100 });

    const res = await request(app).post("/api/v1/accounts/deposit-funds").send({
      email: "dep@example.com",
      amount: 50,
    });

    expect(res.status).toBe(200);
    expect(res.body.balance).toBe(150);
  });

  it("should return 404 if account not found on deposit", async () => {
    const res = await request(app).post("/api/v1/accounts/deposit-funds").send({
      email: "notfound@example.com",
      amount: 50,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Account not found");
  });

  it("should return 400 if deposit amount invalid", async () => {
    await Accounts.create({ name: "Invalid Deposit", email: "invdep@example.com", balance: 100 });

    const res = await request(app).post("/api/v1/accounts/deposit-funds").send({
      email: "invdep@example.com",
      amount: -10,
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0]).toHaveProperty("msg", "Amount must be a number greater than 0");
  });

  // Test withdrawFunds
  it("should withdraw funds from account", async () => {
    await Accounts.create({ name: "Withdraw User", email: "with@example.com", balance: 100 });

    const res = await request(app).post("/api/v1/accounts/withdraw-funds").send({
      email: "with@example.com",
      amount: 50,
    });

    expect(res.status).toBe(200);
    expect(res.body.balance).toBe(50);
  });

  it("should return 404 if account not found on withdraw", async () => {
    const res = await request(app).post("/api/v1/accounts/withdraw-funds").send({
      email: "notfound@example.com",
      amount: 50,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Account not found");
  });

  it("should return 400 if withdraw amount invalid", async () => {
    await Accounts.create({ name: "Invalid Withdraw", email: "invwith@example.com", balance: 100 });

    const res = await request(app).post("/api/v1/accounts/withdraw-funds").send({
      email: "invwith@example.com",
      amount: -10,
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0]).toHaveProperty("msg", "Amount must be a number greater than 0");
  });

  it("should return 400 if insufficient funds on withdraw", async () => {
    await Accounts.create({ name: "Poor User", email: "poor@example.com", balance: 20 });

    const res = await request(app).post("/api/v1/accounts/withdraw-funds").send({
      email: "poor@example.com",
      amount: 50,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Insufficient funds");
  });

  // Test checkBalance
  it("should return account balance", async () => {
    await Accounts.create({ name: "Balance User", email: "bal@example.com", balance: 75 });

    const res = await request(app).get("/api/v1/accounts/check-balance/bal@example.com");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("bal@example.com");
    expect(res.body.balance).toBe(75);
  });

  it("should return 404 if account not found on checkBalance", async () => {
    const res = await request(app).get("/api/v1/accounts/check-balance/notfound@example.com");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Account not found");
  });
});