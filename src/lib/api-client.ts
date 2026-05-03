import type {
  UserCredentials,
  RegisterData,
  SocialLoginRequest,
  RefreshTokenRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CreateAlarmRequest,
  UpdateAlarmRequest,
  ToggleAlarmRequest,
  StationsQuery,
  RateStationRequest,
  ReportStationRequest,
  SuggestStationRequest,
} from "./api-types";

const BASE_URL = process.env.API_BASE_URL ?? "https://api.radioaroundtheworld.com";

type RequestOptions = {
  headers?: Record<string, string>;
};

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return undefined as T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`API error ${status}: ${body}`);
    this.name = "ApiError";
  }
}

// ── Authentication ──

export const auth = {
  login: (data: UserCredentials, opts?: RequestOptions) =>
    request("POST", "/Authentication/Login", data, opts),

  register: (data: RegisterData, opts?: RequestOptions) =>
    request("POST", "/Authentication/Register", data, opts),

  verifyEmail: (token: string, opts?: RequestOptions) =>
    request("GET", `/Authentication/VerifyEmail?token=${encodeURIComponent(token)}`, undefined, opts),

  socialLogin: (data: SocialLoginRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/SocialLogin", data, opts),

  refreshToken: (data: RefreshTokenRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/RefreshToken", data, opts),

  logout: (data: RefreshTokenRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/Logout", data, opts),

  changePassword: (data: ChangePasswordRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/ChangePassword", data, opts),

  forgotPassword: (data: ForgotPasswordRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/ForgotPassword", data, opts),

  resetPassword: (data: ResetPasswordRequest, opts?: RequestOptions) =>
    request("POST", "/Authentication/ResetPassword", data, opts),
};

// ── Alarms ──

export const alarms = {
  getAll: (opts?: RequestOptions) =>
    request("GET", "/Alarms", undefined, opts),

  getById: (alarmId: string, opts?: RequestOptions) =>
    request("GET", `/Alarms/${alarmId}`, undefined, opts),

  create: (data: CreateAlarmRequest, opts?: RequestOptions) =>
    request("POST", "/Alarms", data, opts),

  update: (alarmId: string, data: UpdateAlarmRequest, opts?: RequestOptions) =>
    request("PUT", `/Alarms/${alarmId}`, data, opts),

  delete: (alarmId: string, opts?: RequestOptions) =>
    request("DELETE", `/Alarms/${alarmId}`, undefined, opts),

  toggle: (alarmId: string, data: ToggleAlarmRequest, opts?: RequestOptions) =>
    request("PATCH", `/Alarms/${alarmId}/toggle`, data, opts),
};

// ── Countries ──

export const countries = {
  getAll: (opts?: RequestOptions) =>
    request("GET", "/Countries", undefined, opts),
};

// ── Favorites ──

export const favorites = {
  getAll: (opts?: RequestOptions) =>
    request("GET", "/Favorites", undefined, opts),

  add: (stationUuid: string, opts?: RequestOptions) =>
    request("POST", `/Favorites/${stationUuid}`, undefined, opts),

  remove: (stationUuid: string, opts?: RequestOptions) =>
    request("DELETE", `/Favorites/${stationUuid}`, undefined, opts),

  check: (stationUuid: string, opts?: RequestOptions) =>
    request("GET", `/Favorites/${stationUuid}`, undefined, opts),
};

// ── Languages ──

export const languages = {
  getAll: (opts?: RequestOptions) =>
    request("GET", "/Languages", undefined, opts),
};

// ── Stations ──

export const stations = {
  getAll: (query?: StationsQuery, opts?: RequestOptions) => {
    const params = new URLSearchParams();
    if (query?.take != null) params.set("take", String(query.take));
    if (query?.page != null) params.set("page", String(query.page));
    if (query?.country) params.set("country", query.country);
    if (query?.searchString) params.set("searchString", query.searchString);
    const qs = params.toString();
    return request("GET", `/Stations${qs ? `?${qs}` : ""}`, undefined, opts);
  },

  getById: (stationUuid: string, opts?: RequestOptions) =>
    request("GET", `/Stations/${stationUuid}`, undefined, opts),

  rate: (stationUuid: string, data: RateStationRequest, opts?: RequestOptions) =>
    request("PUT", `/Stations/${stationUuid}/rating`, data, opts),

  removeRating: (stationUuid: string, opts?: RequestOptions) =>
    request("DELETE", `/Stations/${stationUuid}/rating`, undefined, opts),

  report: (stationUuid: string, data: ReportStationRequest, opts?: RequestOptions) =>
    request("POST", `/Stations/${stationUuid}/report`, data, opts),

  suggest: (data: SuggestStationRequest, opts?: RequestOptions) =>
    request("POST", "/Stations/suggest", data, opts),
};

const apiClient = { auth, alarms, countries, favorites, languages, stations };
export default apiClient;
