import * as SecureStore from "expo-secure-store";

import type { AuthTokens } from "@/api/auth";

const accessTokenKey = "moneyway.accessToken";
const refreshTokenKey = "moneyway.refreshToken";

export const getStoredTokens = async (): Promise<AuthTokens | null> => {
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(accessTokenKey),
    SecureStore.getItemAsync(refreshTokenKey),
  ]);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: "Bearer",
    expires_in: 0,
  };
};

export const storeTokens = async (tokens: AuthTokens) => {
  await Promise.all([
    SecureStore.setItemAsync(accessTokenKey, tokens.access_token),
    SecureStore.setItemAsync(refreshTokenKey, tokens.refresh_token),
  ]);
};

export const clearStoredTokens = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(accessTokenKey),
    SecureStore.deleteItemAsync(refreshTokenKey),
  ]);
};
