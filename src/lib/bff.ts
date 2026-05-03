import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./api-client";

type RequestOptions = {
  headers?: Record<string, string>;
};

export function forwardAuthHeader(req: NextRequest): RequestOptions {
  const auth = req.headers.get("authorization");
  if (!auth) return {};
  return { headers: { Authorization: auth } };
}

export async function handleApiCall<T>(
  fn: () => Promise<T>,
): Promise<NextResponse> {
  try {
    const result = await fn();
    return NextResponse.json(result ?? { success: true });
  } catch (error) {
    if (error instanceof ApiError) {
      let body: unknown;
      try {
        body = JSON.parse(error.body);
      } catch {
        body = { message: error.body };
      }
      return NextResponse.json(body, { status: error.status });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
