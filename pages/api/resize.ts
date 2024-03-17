// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

import { bufferToBase64 } from "@/lib/files";

type ResizeReqBody = {
  image: {
    type: string;
    base64: string;
  };
  dimensions: {
    width: string;
    height: string;
  };
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
    const { image, dimensions } = JSON.parse(req.body) as ResizeReqBody;
    const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
    const resized = await sharp(Buffer.from(base64Data, "base64"))
      .resize(Number(dimensions.width), Number(dimensions.height))
      .withMetadata()
      .toBuffer();
    res.status(200).json({
      message: "OK",
      data: {
        img: bufferToBase64(resized, image.type),
      },
    });
  } else {
    res.status(405).send("Method not allowed!");
  }
}
