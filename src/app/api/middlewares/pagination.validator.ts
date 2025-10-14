import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const paginationQueryValidator = zValidator(
  "query",
  z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => Number(val) || 12),
    offset: z
      .string()
      .optional()
      .transform((val) => Number(val) || 0),
  })
);
