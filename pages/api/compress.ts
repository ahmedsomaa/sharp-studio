// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

import { bufferToBase64 } from "@/lib/files";

type CompressReqBody = {
  format: "avif" | "webp";
  image: { type: string; base64: string };
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { image, format } = JSON.parse(req.body) as CompressReqBody;
    const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");
    const resized =
      format === "avif"
        ? await sharp(imgBuffer).avif({ quality: 80 }).toBuffer()
        : await sharp(imgBuffer).webp({ quality: 80 }).toBuffer();
    res.status(200).json({
      message: "OK",
      data: {
        size: resized.byteLength,
        img: bufferToBase64(resized, `image/${format}`),
      },
    });
  } else {
    res.status(405).send("Method not allowed!");
  }
}
