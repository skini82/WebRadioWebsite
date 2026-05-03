import { NextRequest } from "next/server";
import { alarms } from "@/lib/api-client";
import { handleApiCall, forwardAuthHeader } from "@/lib/bff";

export async function GET(req: NextRequest) {
  return handleApiCall(() => alarms.getAll(forwardAuthHeader(req)));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return handleApiCall(() => alarms.create(body, forwardAuthHeader(req)));
}
