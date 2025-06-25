import accounts from "./accounts.js";
import express from "express";

const router = express.Router();

router.use("/accounts", accounts);

export default router;