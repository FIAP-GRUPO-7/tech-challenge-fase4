import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { useAuth } from "@hooks/useAuth";
import { colors, fontSize, radius, spacing } from "../presentation/styles/theme";

import OcultarSaldoIcon from '../assets/images/ocultar-saldo-preto.png';
import FileUploaderComponent from '../presentation/components/ui/FileUploaderComponent';

import { makeGetBalanceUseCase } from "../main/factories/transactions/makeGetBalanceUseCase";

export default function AddTransaction() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const recipientFromParams = params.recipient;

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const [numericValue, setNumericValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [attachmentUrl, setAttachmentUrl] = useState(null);

  useEffect(() => {
    if (!recipientFromParams) {
      Alert.alert("Erro", "Nenhum destinatário selecionado.");
      router.back();
    }
  }, [recipientFromParams]);

  useEffect(() => {
    async function loadBalance() {
      if (!user?.uid) {
        setLoadingBalance(false);
        return;
      }

      const getBalanceUseCase = makeGetBalanceUseCase();
      const res = await getBalanceUseCase.execute(user.uid);

      if (res.success) {
        setBalance(Number(res.data?.saldo ?? 0));
      } else {
        setBalance(0);
      }

      setLoadingBalance(false);
    }

    loadBalance();
  }, [user]);

  const handleValueChange = (text) => {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned === "") {
      setNumericValue(0);
      setFormattedValue("");
      return;
    }

    const value = parseInt(cleaned, 10) / 100;
    setNumericValue(value);

    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    setFormattedValue(formatted);
  };

  const handleSaveTransaction = async () => {
    if (authLoading) {
      Alert.alert("Aguarde", "Carregando usuário...");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return router.replace("/Login");
    }

    if (numericValue <= 0) {
      const msg = "Insira um valor válido.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
      return;
    }

    if (numericValue > balance) {
      const msg = "O valor excede o saldo disponível.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Saldo insuficiente", msg);
      return;
    }

    setLoading(true);

    router.push({
      pathname: "/Loading",
      params: {
        recipient: recipientFromParams,
        value: numericValue,
        attachmentUrl: attachmentUrl || "",
      },
    });
  };

  return (
    <View style={styles.container}>

      {/*  HEADER*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Transferência</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* SALDO */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Disponível:</Text>

          {loadingBalance ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.balanceValue}>
                {showBalance
                  ? `R$ ${balance.toFixed(2).replace(".", ",")}`
                  : "●●●●●●"}
              </Text>

              <TouchableOpacity onPress={() => setShowBalance((s) => !s)}>
                <Image source={OcultarSaldoIcon} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* FORM */}
        <View style={styles.formContainer}>
          <Text style={styles.recipientLabel}>Transferindo para:</Text>
          <Text style={styles.recipientName}>{recipientFromParams}</Text>

          <Text style={styles.label}>Valor</Text>
          <TextInput
            placeholder="R$ 0,00"
            value={formattedValue}
            onChangeText={handleValueChange}
            keyboardType="numeric"
            style={styles.valueInput}
            placeholderTextColor={colors.text.muted}
          />

          <View style={{ marginTop: spacing.xl }}>
            {user && (
              <FileUploaderComponent
                user={user}
                onUploadSuccess={setAttachmentUrl}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* BOTÃO */}
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSaveTransaction}>
            <Text style={styles.buttonText}>Transferir agora</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },

  backButton: {
    fontSize: 42,
    color: colors.text.black,
    fontWeight: "300",
    width: 40,
  },

  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.text.primary,
  },

  scrollContent: { padding: spacing.lg, flexGrow: 1 },

  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl * 2,
  },

  balanceLabel: { fontSize: fontSize.md, color: colors.text.secondary },

  balanceValue: {
    fontWeight: "bold",
    color: colors.text.primary,
    fontSize: fontSize.md,
  },

  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: spacing.sm,
    resizeMode: "contain",
  },

  formContainer: { flex: 1 },

  recipientLabel: { fontSize: fontSize.sm, color: colors.text.muted },

  recipientName: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: spacing.md,
  },

  label: { color: colors.text.secondary, fontSize: fontSize.sm, marginBottom: spacing.xs },

  valueInput: {
    fontSize: 28,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: spacing.sm,
    color: colors.text.primary,
  },

  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  button: {
    backgroundColor: colors.secondary,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: "center",
  },

  buttonText: {
    color: colors.text.white,
    fontSize: fontSize.md,
    fontWeight: "bold",
  },
});
