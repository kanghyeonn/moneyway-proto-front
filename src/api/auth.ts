import { fetchJson } from "./client";

export type AuthUser = {
  id: number;
  email: string | null;
  phone_number: string | null;
  name: string | null;
  profile_image_url: string | null;
  status: string;
  marketing_agreed: boolean;
  created_at: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

export const loginWithGoogle = (params: {
  idToken: string;
  deviceId?: string;
  marketingAgreed?: boolean;
}) => {
  return fetchJson<AuthResponse>("/api/auth/oauth/google", {
    method: "POST",
    body: {
      id_token: params.idToken,
      device_id: params.deviceId,
      marketing_agreed: params.marketingAgreed ?? false,
    },
  });
};

export const refreshAuthTokens = (params: {
  refreshToken: string;
  deviceId?: string;
}) => {
  return fetchJson<AuthResponse>("/api/auth/refresh", {
    method: "POST",
    body: {
      refresh_token: params.refreshToken,
      device_id: params.deviceId,
    },
  });
};

export const fetchCurrentUser = (accessToken: string) => {
  return fetchJson<AuthUser>("/api/auth/me", {
    accessToken,
  });
};

export const logout = (refreshToken: string) => {
  return fetchJson<{ revoked: boolean }>("/api/auth/logout", {
    method: "POST",
    body: {
      refresh_token: refreshToken,
    },
  });
};
