import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@presentation/hooks/useAuth";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="Loading" />
          <Stack.Screen name="Comprovante" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
