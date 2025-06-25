import express from "express";

import accounts from "./accounts.js";
import transactions from "./transactions.js";

const router = express.Router();

router.use("/accounts", accounts);
router.use("/transactions", transactions);

export default router;