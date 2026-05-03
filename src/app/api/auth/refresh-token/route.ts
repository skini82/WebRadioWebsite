import { NextRequest } from "next/server";
import { auth } from "@/lib/api-client";
import { handleApiCall } from "@/lib/bff";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return handleApiCall(() => auth.refreshToken(body));
}
