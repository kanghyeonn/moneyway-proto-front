import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router, type Href } from "expo-router";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";

import {
  fetchCurrentUser,
  loginWithGoogle,
  logout,
  refreshAuthTokens,
  type AuthTokens,
  type AuthUser,
} from "@/api/auth";
import {
  clearStoredTokens,
  getStoredTokens,
  storeTokens,
} from "./tokenStore";

type AuthContextValue = {
  error: string | null;
  isAuthenticated: boolean;
  isGoogleLoading: boolean;
  isLoading: boolean;
  signInWithGoogle: (options?: { marketingAgreed?: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  tokens: AuthTokens | null;
  user: AuthUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId,
    iosClientId,
  });
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const applyAuthResponse = useCallback(
    async (nextUser: AuthUser, nextTokens: AuthTokens) => {
      await storeTokens(nextTokens);
      setUser(nextUser);
      setTokens(nextTokens);
    },
    [],
  );

  const clearAuthState = useCallback(async () => {
    await clearStoredTokens();
    setUser(null);
    setTokens(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const storedTokens = await getStoredTokens();

        if (!storedTokens) {
          return;
        }

        try {
          const currentUser = await fetchCurrentUser(storedTokens.access_token);

          if (!isMounted) {
            return;
          }

          setTokens(storedTokens);
          setUser(currentUser);
        } catch {
          const refreshed = await refreshAuthTokens({
            refreshToken: storedTokens.refresh_token,
          });

          if (!isMounted) {
            return;
          }

          await applyAuthResponse(refreshed.user, refreshed.tokens);
        }
      } catch {
        if (isMounted) {
          await clearAuthState();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [applyAuthResponse, clearAuthState]);

  const signInWithGoogle = useCallback(async (options?: {
    marketingAgreed?: boolean;
  }) => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      if (!webClientId) {
        throw new Error("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is missing");
      }

      if (Platform.OS === "ios" && !iosClientId) {
        throw new Error("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID is missing");
      }

      if (Platform.OS === "android") {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error("Google ID token is missing");
      }

      const authResponse = await loginWithGoogle({
        idToken,
        marketingAgreed: options?.marketingAgreed,
      });

      await applyAuthResponse(authResponse.user, authResponse.tokens);
      router.replace("/home" as Href);
    } catch (nextError: unknown) {
      if (
        isErrorWithCode(nextError) &&
        nextError.code === statusCodes.SIGN_IN_CANCELLED
      ) {
        return;
      }

      setError(
        nextError instanceof Error
          ? nextError.message
          : "Google 로그인에 실패했습니다.",
      );
    } finally {
      setIsGoogleLoading(false);
    }
  }, [applyAuthResponse]);

  const signOut = useCallback(async () => {
    const refreshToken = tokens?.refresh_token;

    try {
      if (refreshToken) {
        await logout(refreshToken);
      }
    } catch {
      // Local logout should still proceed even when backend logout fails.
    }

    try {
      await GoogleSignin.signOut();
    } catch {
      // Google session may already be cleared.
    }

    await clearAuthState();
    router.replace("/login" as Href);
  }, [clearAuthState, tokens?.refresh_token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      error,
      isAuthenticated: Boolean(user && tokens),
      isGoogleLoading,
      isLoading,
      signInWithGoogle,
      signOut,
      tokens,
      user,
    }),
    [error, isGoogleLoading, isLoading, signInWithGoogle, signOut, tokens, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
