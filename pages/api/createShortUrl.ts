// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  // Get data from request
  const data = req.body;

  // guard against empty data
  if (!data.url) {
    return res.status(400).json({ error: 'Missing title' });
  }

  res.status(200).json({url: data.url});
}
