import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // guard clause against non get requests
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Get data from request
    const data = req.body;
    const { ShortUrlHash } = data;

    const existingUrlObject = await prisma.url.findUnique({
        where: {
            shortUrlHash: ShortUrlHash,
        }
    });

    if (!existingUrlObject) {
        return res.status(404).json({ error: "Short URL not found" });
    } else {
        return res.status(200).json({
            url: existingUrlObject.url,
        });
    }
}