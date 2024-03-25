import { z } from "zod";

export const requestImageSchema = z.object({
  method: z.literal("POST"),
  body: z.object({
    format: z.union([z.literal("avif"), z.literal("webp")]),
    image: z.object({
      base64: z.string().regex(/^data:image\/\w+;base64,/),
      type: z.string(),
    }),
  }),
});
