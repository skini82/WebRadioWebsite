import { NextRequest } from "next/server";
import { favorites } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function GET(req: NextRequest) {
  return handleApiCall(() => favorites.getAll(forwardAuthHeader(req)));
}
