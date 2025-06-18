import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectDB();
    const collections = await db.listCollections().toArray();
    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ error: "DB connection failed" });
  }
}
