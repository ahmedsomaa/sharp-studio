import sharp from "sharp";

import { createApiHandler } from "@/components/api/createHandler";
import { base64ToBuffer, bufferToBase64 } from "@/lib/files";
import { CompressImageSchema } from "@/components/api/schema";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};

export default createApiHandler(CompressImageSchema, async ({ body }) => {
  const imgBuffer = base64ToBuffer(body.image.base64)

  const resized = await sharp(imgBuffer)
    [body.format]({ quality: 80 })
    .toBuffer();

  return {
    message: "OK",
    data: {
      size: resized.byteLength,
      img: bufferToBase64(resized, `image/${body.format}`),
    },
  };
});
