import { NextRequest } from "next/server";
import { stations } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const query = {
    take: sp.has("take") ? Number(sp.get("take")) : undefined,
    page: sp.has("page") ? Number(sp.get("page")) : undefined,
    country: sp.get("country") ?? undefined,
    searchString: sp.get("searchString") ?? undefined,
  };
  return handleApiCall(() => stations.getAll(query, forwardAuthHeader(req)));
}
