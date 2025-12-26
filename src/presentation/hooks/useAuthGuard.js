import { useEffect, useRef } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "./useAuth";

export function useAuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const redirected = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (redirected.current) return;

    const currentSegment = segments?.[0] ?? "";

    const isPublic =
      currentSegment === "Login" ||
      currentSegment === "Register";

    if (!user && !isPublic) {
      redirected.current = true;

      router.replace("/Login");
      return;
    }

    if (user && isPublic) {
      redirected.current = true;

      router.replace("/tabs/Home");
      return;
    }
  }, [user, loading, segments, router]);

  return { user, loading, isAuthenticated: !!user };
}
