import { NextRequest } from "next/server";
import { countries } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function GET(req: NextRequest) {
  return handleApiCall(() => countries.getAll(forwardAuthHeader(req)));
}
