import Accounts from "../models/accounts.js";
import Transactions from "../models/transactions.js";

const getAllTransactionsForUser = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await Accounts.findOne({ email: email.toString() });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const transactionsDetails = await Transactions.find({ accountId: account._id });

    const transactions = await Transactions.aggregate([
      {
        $group: {
          accountId: "$accountId",
          totalDeposits: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "deposit"] }, "$amount", 0]
            }
          },
          totalWithdrawals: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "withdraw"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    if (!transactions || !transactionsDetails) {
      return res.status(404).json({ error: "Transactions not found" });
    }

    res.status(200).json({
      summary: transactions[0],
      transactionsDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const transactionDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transactions.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getAllTransactionsForUser,
  transactionDetails
}