import express from "express";
import { openAccount, depositFunds, withdrawFunds, checkBalance } from "../controllers/accounts.js";

const router = express.Router();

router.post("/open-account", openAccount);
router.post("/deposit-funds", depositFunds);
router.post("/withdraw-funds", withdrawFunds);
router.get("/check-balance/:email", checkBalance);

export default router;