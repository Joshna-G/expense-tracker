// pages/api/expenses/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import { Expense } from "../../../lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectDB();
  const collection = db.collection<Expense>("expenses");

  if (req.method === "GET") {
    const expenses = await collection.find().toArray();
    return res.status(200).json(expenses);
  }

  if (req.method === "POST") {
    const expense: Expense = req.body;
    const result = await collection.insertOne(expense);
    return res.status(201).json(result);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
