import sharp from "sharp";

import { createApiHandler } from "@/components/api/createHandler";
import { ResizeImageSchema } from "@/components/api/schema";
import { base64ToBuffer, bufferToBase64 } from "@/lib/files";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};

export default createApiHandler(ResizeImageSchema, async ({ body }) => {
  const { image, options } = body;
  const imageBuffer = base64ToBuffer(image.base64);
  const resized = await sharp(imageBuffer)
    .resize(
      Number(options.dimensions.width),
      Number(options.dimensions.height),
      { fit: options.fit }
    )
    .withMetadata()
    .toBuffer();

  return {
    status: 200,
    message: "OK",
    data: {
      img: bufferToBase64(resized, image.type),
    },
  };
});
