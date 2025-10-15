import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return { session: session?.session, user: session?.user };
};
