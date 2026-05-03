import { NextRequest } from "next/server";
import { stations } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ stationUuid: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  const body = await req.json();
  return handleApiCall(() => stations.report(stationUuid, body, forwardAuthHeader(req)));
}
