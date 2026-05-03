import { NextRequest } from "next/server";
import { stations } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return handleApiCall(() => stations.suggest(body, forwardAuthHeader(req)));
}
