// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";
import { generateUniqueUrlHash } from "../../utils";

export const getUrlObjectFromUserInput = async (url: string) => {
  return await prisma.url.findUnique({
    where: {
      url: url,
    }
  });
}

export const createUrlObject = async (url: string) => {
  // keep retrying prisma create until hash is unique
  while (true) {
    try {
      let hash = generateUniqueUrlHash(url);
      return await prisma.url.create({
        data: {
          url: url,
          shortUrlHash: hash,
        }
      });
    } catch (error) {
      // do nothing
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // guard clause against non post requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Get data from request
  const data = req.body;
  const { url } = data;

  // check if url already exists in db
  const existingUrlObject = await getUrlObjectFromUserInput(url);

  let returnedUrlObject = existingUrlObject;

  // if url doesn't exist in db, create unique hash and insert into db
  if (!existingUrlObject) {
    returnedUrlObject = await createUrlObject(url);
  }

  return res.status(200).json({
    shortUrlHash: returnedUrlObject?.shortUrlHash,
  });
}
