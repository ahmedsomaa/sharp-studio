// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { image, dimensions } = JSON.parse(req.body) as ResizeReqBody;
    const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");

    try {
      // FIXME: find a way to send va
      const resized = await sharp(Buffer.from(base64Data, "base64"))
        .resize(Number(dimensions.width), Number(dimensions.height))
        .toBuffer();
      res.status(200).json({
        message: "OK",
        data: `data:${image.type};base64,${resized.toString("base64")}`,
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", data: error });
    }
  } else {
    res.status(404);
  }
}
