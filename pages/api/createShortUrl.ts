// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";
import { generateUniqueUrlHash } from "../../utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // guard clause against non post requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Get data from request
  const data = req.body;
  const { url } = data;

  // check if url already exists in db
  const existingUrlObject = await prisma.url.findUnique({
    where: {
      url: url,
    }
  });

  let returnedUrlObject = existingUrlObject;

  // if url doesn't exist in db, create unique hash and insert into db
  if (!existingUrlObject) {

    // keep retrying prisma create until hash is unique
    while (true) {
      try {
        let hash = generateUniqueUrlHash(url);
        returnedUrlObject = await prisma.url.create({
          data: {
            url: url,
            shortUrlHash: hash,
          }
        });
        break;
      } catch (error) {
        // do nothing
      }
    }
  }

  return res.status(200).json({
    shortUrlHash: returnedUrlObject?.shortUrlHash,
  });
}
