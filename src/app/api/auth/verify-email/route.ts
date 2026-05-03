import { NextRequest } from "next/server";
import { auth } from "@/lib/api-client";
import { handleApiCall } from "@/lib/bff";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  return handleApiCall(() => auth.verifyEmail(token));
}
