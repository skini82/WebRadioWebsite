import { NextRequest } from "next/server";
import { alarms } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ alarmId: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { alarmId } = await params;
  const body = await req.json();
  return handleApiCall(() => alarms.toggle(alarmId, body, forwardAuthHeader(req)));
}
