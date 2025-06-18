// pages/api/expenses/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectDB();
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    switch (req.method) {
      case "GET":
        const expense = await db.collection("expenses").findOne({ _id: new ObjectId(id) });
        if (!expense) return res.status(404).json({ message: "Expense not found" });
        return res.status(200).json(expense);

      case "PUT":
        const updated = await db.collection("expenses").updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );
        return res.status(200).json({ message: "Updated", updated });

      case "DELETE":
        const deleted = await db.collection("expenses").deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Deleted", deleted });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
