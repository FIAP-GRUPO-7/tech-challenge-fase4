import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import { useAuth } from "@hooks/useAuth";
import { Header, BalanceSection, TransactionForm, ActionFooter } from '../presentation/components/organisms';
import { colors, fontSize, radius, spacing } from "../presentation/styles/theme";

import useBalance from '../presentation/hooks/useBalance';

export default function AddTransaction() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const recipientFromParams = params.recipient;

  const [menuVisible, setMenuVisible] = useState(false);

  const { balance, loading: loadingBalance } = useBalance(user);
  const [numericValue, setNumericValue] = useState(0);

  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [attachmentUrl, setAttachmentUrl] = useState(null);

  useEffect(() => {
    if (!recipientFromParams) {
      Alert.alert("Erro", "Nenhum destinatário selecionado.");
      router.back();
    }
  }, [recipientFromParams, router]);

  // balance loading handled by useBalance

  const handleValueChange = (num) => {
    setNumericValue(num || 0);
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
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Erro", msg);
      }
      return;
    }

    if (numericValue > balance) {
      const msg = "O valor excede o saldo disponível.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Saldo insuficiente", msg);
      }
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

      <Header user={user} menuVisible={menuVisible} setMenuVisible={setMenuVisible} logout={logout} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BalanceSection balance={balance} loading={loadingBalance} showBalance={showBalance} setShowBalance={setShowBalance} />

        <View style={styles.formContainer}>
          <TransactionForm recipient={recipientFromParams} user={user} value={numericValue} onChangeValue={handleValueChange} onUploadSuccess={setAttachmentUrl} />
        </View>
      </ScrollView>

      <ActionFooter loading={loading} onPress={handleSaveTransaction} title="Transferir agora" />
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
