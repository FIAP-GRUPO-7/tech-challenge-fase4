import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../presentation/hooks/useAuth";
import { makeCreateTransferUseCase } from "../main/factories/transactions/makeCreateTransferUseCase";

import { colors, fontSize } from "../presentation/styles/theme";

export default function LoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, loading: authLoading } = useAuth();

  const recipient = params.recipient || "";
  const value = Number(params.value) || 0;
  const attachmentUrl = params.attachmentUrl || null;

  const [executed, setExecuted] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!authLoading) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    }
  }, [authLoading, progress]);

  useEffect(() => {
    if (authLoading || executed) return;
    if (!user) return;

    setExecuted(true);

    const executeTransfer = async () => {
      const createTransferUseCase = makeCreateTransferUseCase();
      try {
        const result = await createTransferUseCase.execute({
          userId: user.uid,
          recipient,
          value,
          attachmentUrl,
        });

        if (!result.success) {
          Alert.alert("Erro", result.error || "Falha ao realizar transferência.");
          return router.replace("/tabs/Home");
        }

        router.replace({
          pathname: "/Comprovante",
          params: {
            recipient,
            value,
            transactionId: result.transactionId,
            attachmentUrl: attachmentUrl || "",
          },
        });

      } catch (err) {
        console.error("Erro inesperado:", err);
        Alert.alert("Erro", "Erro inesperado ao executar transferência.");
        router.replace("/tabs/Home");
      }
    };

    setTimeout(() => executeTransfer(), 2000);

  }, [authLoading, user, executed, recipient, value, attachmentUrl, router]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transferindo...</Text>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { width: progressBarWidth }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  text: {
    color: "white",
    fontSize: fontSize.xl + 10,
    fontWeight: "bold",
    marginBottom: 40,
  },
  progressBarBackground: {
    height: 4,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 2,
  },
});
