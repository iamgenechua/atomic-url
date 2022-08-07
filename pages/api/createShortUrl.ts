// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // guard clause against non post requests
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  // Get data from request
  const data = req.body;

  // guard against empty data
  if (!data.url) {
    return res.status(400).json({ error: 'Missing title' });
  }
  
  console.log(data.url);

  // check if url already exists in db
  const urlExists = await prisma.url.findUnique({
    where: {
      url: data.url,
    }
  });

  // guard clause url does not exist in db
  if (!urlExists) {
    return res.status(404).json({ error: 'Url not found' });
  }

  res.status(200).json(urlExists.shortUrlHash);
}
