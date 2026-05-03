import { NextRequest } from "next/server";
import { alarms } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

type Params = { params: Promise<{ alarmId: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { alarmId } = await params;
  return handleApiCall(() => alarms.getById(alarmId, forwardAuthHeader(req)));
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { alarmId } = await params;
  const body = await req.json();
  return handleApiCall(() => alarms.update(alarmId, body, forwardAuthHeader(req)));
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { alarmId } = await params;
  return handleApiCall(() => alarms.delete(alarmId, forwardAuthHeader(req)));
}
