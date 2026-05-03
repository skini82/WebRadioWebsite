import { NextRequest } from "next/server";
import { stations } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ stationUuid: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  const body = await req.json();
  return handleApiCall(() => stations.rate(stationUuid, body, forwardAuthHeader(req)));
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  return handleApiCall(() => stations.removeRating(stationUuid, forwardAuthHeader(req)));
}
