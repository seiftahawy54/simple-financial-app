import {Router} from "express";
import {getAllTransactionsForUser, transactionDetails} from '../controllers/transactions.js';
import {validateGetAllTransactions} from "../middlewares/validation.js";


const router = Router();

/**
 * @swagger
 * /transactions/all-transactions/{email}:
 *   get:
 *     summary: Get all transactions for a user by email
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email address of the user account
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: List of transactions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Transaction ID
 *                   accountId:
 *                     type: string
 *                     description: ID of the associated account
 *                   type:
 *                     type: string
 *                     description: Type of transaction (deposit, withdrawal, etc.)
 *                   amount:
 *                     type: number
 *                     description: Transaction amount
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time of the transaction
 *       404:
 *         description: Account or transactions not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Account not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error message
 */
router.get("/all-transactions/:email", validateGetAllTransactions, getAllTransactionsForUser);


/**
 * @swagger
 * /transactions/transaction-details/{transactionId}:
 *   get:
 *     summary: Get details of a specific transaction by ID
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID of the transaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Transaction ID
 *                 accountId:
 *                   type: string
 *                   description: ID of the associated account
 *                 type:
 *                   type: string
 *                   description: Type of transaction (deposit, withdrawal, etc.)
 *                 amount:
 *                   type: number
 *                   description: Transaction amount
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of the transaction
 *       404:
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Transaction not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error message
*/

router.get("/transaction-details/:transactionId", transactionDetails);

export default router;