import Accounts from "../models/accounts.js";

const openAccount = async (req, res) => {
  const { name, email, balance } = req.body;

  const existingAccount = await Accounts.findOne({ email });

  if (existingAccount) {
    return res.status(400).json({ error: "Account already exists" });
  }

  try {
    const newAccount = new Accounts({ name, email, balance });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const depositFunds = async (req, res) => {
  const { email, amount } = req.body;

  try {
    const account = await Accounts.findOne({ email });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a number and greater than 0" });
    }

    account.balance += amount;
    await account.save();
    return res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const withdrawFunds = async (req, res) => {
  try {
    const { email, amount } = req.body;

    const account = await Accounts.findOne({ email });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a number and greater than 0" });
    }

    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    account.balance -= amount;
    await account.save();
    return res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkBalance = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await Accounts.findOne({ email });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  openAccount,
  depositFunds,
  withdrawFunds,
  checkBalance
}