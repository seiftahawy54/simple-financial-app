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


})