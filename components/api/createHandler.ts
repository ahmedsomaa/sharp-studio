import { HttpError } from "@/lib/error";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export function createApiHandler<
  T extends {
    body?: any;
    query?: any;
    params?: any;
  },
>(
  schema: { parse: (req: any) => T },
  handler: ({ body, query, params }: T) => Promise<any>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (
        req.headers["content-type"]?.includes("application/json") ||
        req.headers["content-type"]?.includes("text/plain")
      )
        req.body = JSON.parse(req.body);

      const all = schema.parse(req);
      const result = await handler(all);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError)
        return res.status(400).json({ error: true, message: error.message });
      if (error instanceof HttpError)
        return res
          .status(error.status)
          .json({ error: true, message: error.message });

      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    } finally {
      console.log(
        `Finished ${req.method} ${req.url} ${res.statusCode} ${
          res.statusMessage
        } - ${req.headers["content-type"]} ${
          res.getHeaders()["content-length"] || 0
        } - ${req.headers["user-agent"]}`,
      );
    }
  };
}
