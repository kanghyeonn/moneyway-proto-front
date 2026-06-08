import { Redirect, Stack, type Href, useSegments } from "expo-router";

import { AuthProvider, useAuth } from "@/auth/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const routeGroup = segments[0];
  const isAuthRoute = routeGroup === "(auth)";

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated && !isAuthRoute) {
    return <Redirect href={"/login" as Href} />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Redirect href={"/home" as Href} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
