import { Redirect } from "expo-router";
import { useAuth } from "@presentation/hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Redirect href="/tabs/Home" /> : <Redirect href="/Login" />;
}
