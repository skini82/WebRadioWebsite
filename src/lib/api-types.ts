// ── Enums ──

export enum RepeatMode {
  Once = 0,
  Daily = 1,
  Weekdays = 2,
  Custom = 3,
}

export enum StationReportReason {
  NotWorking = 0,
  WrongInfo = 1,
  Inappropriate = 2,
  Other = 3,
}

// ── Authentication ──

export interface UserCredentials {
  eMail: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  userName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  preferredLanguage?: string | null;
}

export interface SocialLoginRequest {
  provider: string;
  token: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// ── Alarms ──

export interface CreateAlarmRequest {
  stationUuid: string;
  time: string;
  repeatMode: RepeatMode;
  label?: string | null;
  customDays?: number | null;
  snoozeMaxCount?: number;
  snoozeIntervalMinutes?: number;
}

export interface UpdateAlarmRequest {
  stationUuid: string;
  time: string;
  repeatMode: RepeatMode;
  label?: string | null;
  customDays?: number | null;
  snoozeMaxCount?: number;
  snoozeIntervalMinutes?: number;
}

export interface ToggleAlarmRequest {
  isEnabled: boolean;
}

// ── Stations ──

export interface StationsQuery {
  take?: number;
  page?: number;
  country?: string;
  searchString?: string;
}

export interface RateStationRequest {
  rating: number;
}

export interface ReportStationRequest {
  reason: StationReportReason;
  notes?: string | null;
}

export interface SuggestStationRequest {
  name: string;
  url: string;
  urlResolved?: string | null;
  homepage?: string | null;
  tags?: string | null;
  countryCode?: string | null;
  state?: string | null;
  isoCode?: string | null;
  languageCodes?: string | null;
  bitrate?: number;
  geoLat?: number | null;
  geoLong?: number | null;
}
