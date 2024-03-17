// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

import { bufferToBase64 } from "@/lib/files";

type ConvertReqBody = {
  image: { type: string; base64: string };
  options: { format: "jpg" | "png" | "webp"; quality?: number };
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { image, options } = JSON.parse(req.body) as ConvertReqBody;
    const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
    const resized = await sharp(Buffer.from(base64Data, "base64"))
      .toFormat(options.format, {
        quality: options?.quality ?? 80,
      })
      .withMetadata()
      .toBuffer();
    res.status(200).json({
      message: "OK",
      data: {
        img: bufferToBase64(resized, `image/${options.format}`),
      },
    });
  } else {
    res.status(405).send("Method not allowed!");
  }
}
