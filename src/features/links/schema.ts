import { z } from "zod";

export const ShortLinkSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Please enter a title for your link",
    })
    .max(50, {
      message: "Title should not exceed 50 characters",
    }),
  url: z.url({
    message: "Please enter a valid URL (e.g., https://example.com)",
  }),
  slug: z
    .string()
    .max(30, {
      message: "Slug should not exceed 30 characters",
    })
    .refine((val) => !val || /^[a-zA-Z0-9-]+$/.test(val), {
      message:
        "Custom slug must only contain letters, numbers, or hyphens (no spaces or special characters)",
    }),
});
