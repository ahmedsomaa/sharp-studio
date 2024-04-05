import { z } from "zod";

export const CompressImageSchema = z.object({
  method: z.literal("POST"),
  body: z.object({
    format: z.union([z.literal("avif"), z.literal("webp")]),
    image: z.object({
      base64: z.string().regex(/^data:image\/\w+;base64,/),
      type: z.string(),
    }),
  }),
});

export const ConvertImageSchema = z.object({
  method: z.literal("POST"),
  body: z.object({
    options: z.object({
      format: z.union([
        z.literal("jpg"),
        z.literal("png"),
        z.literal("webp"),
        z.literal("jpeg"),
      ]),
      quality: z.number().optional(),
    }),
    image: z.object({
      base64: z.string().regex(/^data:image\/\w+;base64,/),
      type: z.string(),
    }),
  }),
});

export const ResizeImageSchema = z.object({
  method: z.literal("POST"),
  body: z.object({
    options: z.object({
      dimensions: z.object({
        width: z.string(),
        height: z.string(),
      }),
      fit: z.union([
        z.literal("cover"),
        z.literal("contain"),
        z.literal("fill"),
        z.literal("inside"),
        z.literal("outside"),
      ]),
    }),
    image: z.object({
      base64: z.string().regex(/^data:image\/\w+;base64,/),
      type: z.string(),
    }),
  }),
});
