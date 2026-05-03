import { NextRequest } from "next/server";
import { languages } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function GET(req: NextRequest) {
  return handleApiCall(() => languages.getAll(forwardAuthHeader(req)));
}
