// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from "sharp";

import { createApiHandler } from "@/components/api/createHandler";
import { ConvertImageSchema } from "@/components/api/schema";
import { base64ToBuffer, bufferToBase64 } from "@/lib/files";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};

export default createApiHandler(ConvertImageSchema, async ({ body }) => {
  const { image, options } = body;
  const imageBuffer = base64ToBuffer(image.base64);
  const resized = await sharp(imageBuffer)
    .toFormat(options.format, {
      quality: options?.quality ?? 80,
    })
    .withMetadata()
    .toBuffer();

  return {
    status: 200,
    message: "OK",
    data: {
      img: bufferToBase64(resized, `image/${options.format}`),
    },
  };
});
