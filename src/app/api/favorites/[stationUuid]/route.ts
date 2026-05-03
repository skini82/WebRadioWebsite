import { NextRequest } from "next/server";
import { favorites } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ stationUuid: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  return handleApiCall(() => favorites.check(stationUuid, forwardAuthHeader(req)));
}

export async function POST(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  return handleApiCall(() => favorites.add(stationUuid, forwardAuthHeader(req)));
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { stationUuid } = await params;
  return handleApiCall(() => favorites.remove(stationUuid, forwardAuthHeader(req)));
}
