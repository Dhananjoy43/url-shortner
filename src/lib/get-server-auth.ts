import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { auth } from "@/lib/auth";

export const getServerAuth = async (ctx: Context) => {
  const session = await auth.api.getSession({ headers: ctx.req.raw.headers });

  if (!session) {
    throw new HTTPException(401, {
      res: ctx.json({ error: "Unauthorized" }, 401),
    });
  }

  return { session: session?.session, user: session?.user };
};
