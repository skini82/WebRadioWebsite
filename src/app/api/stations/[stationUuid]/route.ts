import { NextRequest } from "next/server";
import { stations } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ stationUuid: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  return handleApiCall(() => stations.getById(stationUuid, forwardAuthHeader(req)));
}
