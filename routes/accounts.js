import express from "express";
import { openAccount, depositFunds, withdrawFunds, checkBalance } from "../controllers/accounts.js";
import {
  validateCheckBalance,
  validateDepositFunds,
  validateOpenAccount,
  validateWithdrawFunds
} from "../middlewares/validation.js";

const router = express.Router();

/**
 * @swagger
 * /accounts/open-account:
 *   post:
 *     summary: Open a new account
 *     tags:
 *       - Accounts
 *     requestBody:
 *       description: Account details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account opened successfully
 *       400:
 *         description: Invalid input
 */
router.post("/open-account", validateOpenAccount, openAccount);

/**
 * @swagger
 * /accounts/deposit-funds:
 *   post:
 *     summary: Deposit funds into an account
 *     tags:
 *       - Accounts
 *     requestBody:
 *       description: Deposit details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - amount
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Funds deposited successfully
 *       400:
 *         description: Invalid input
 */
router.post("/deposit-funds", validateDepositFunds, depositFunds);

/**
 * @swagger
 * /accounts/withdraw-funds:
 *   post:
 *     summary: Withdraw funds from an account
 *     tags:
 *       - Accounts
 *     requestBody:
 *       description: Withdrawal details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - amount
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Funds withdrawn successfully
 *       400:
 *         description: Invalid input or insufficient funds
 */
router.post("/withdraw-funds", validateWithdrawFunds, withdrawFunds);

/**
 * @swagger
 * /accounts/check-balance/{email}:
 *   get:
 *     summary: Check account balance by email
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the account holder
 *     responses:
 *       200:
 *         description: Account balance returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       404:
 *         description: Account not found
 */
router.get("/check-balance/:email", validateCheckBalance, checkBalance);

export default router;