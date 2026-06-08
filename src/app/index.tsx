import { Redirect, type Href } from "expo-router";

export default function Index() {
  const isLoggedIn = false;

  return <Redirect href={(isLoggedIn ? "/home" : "/login") as Href} />;
}
