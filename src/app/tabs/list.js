import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../presentation/hooks/useAuth";
import { useAuthGuard } from "../../presentation/hooks/useAuthGuard";

import { styles as homeStyles } from "../../presentation/styles/HomeStyles";
import { colors, fontSize, radius, spacing } from "../../presentation/styles/theme";
import { Header, TransactionsList } from "../../presentation/components/organisms";

import useTransactions from "../../presentation/hooks/useTransactions";

export default function Transactions() {
  useAuthGuard();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);
  const { transactions: allTransactions, loading } = useTransactions(user);
  const [searchQuery] = useState("");
  const [selectedType] = useState("Todos");
  const [selectedCategory] = useState("Todos");
  const [selectedDate] = useState(null);

  

  const filteredTransactions = useMemo(() => {
    let tx = [...allTransactions];

    if (searchQuery) {
      tx = tx.filter(
        (t) =>
          (t.type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.recipient || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType === "Entradas") tx = tx.filter((t) => t.value >= 0);
    if (selectedType === "Saídas") tx = tx.filter((t) => t.value < 0);

    if (selectedCategory !== "Todos") tx = tx.filter((t) => t.type === selectedCategory);

    if (selectedDate) {
      tx = tx.filter((t) => {
        const createdMs = t.createdAt || t.createdAtMillis || null;
        if (!createdMs) return false;
        return new Date(createdMs).toLocaleDateString("pt-BR") ===
          selectedDate.toLocaleDateString("pt-BR");
      });
    }

    return tx;
  }, [allTransactions, searchQuery, selectedType, selectedCategory, selectedDate]);

  return (
    <View style={homeStyles.container}>

      {/* HEADER */}
      <Header user={user} menuVisible={menuVisible} setMenuVisible={setMenuVisible} logout={logout} />

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Transações</Text>

          <TouchableOpacity
            style={styles.newTransactionButton}
            onPress={() => router.push("/tabs/add")}
          >
            <Text style={styles.newTransactionButtonText}>+ Nova</Text>
          </TouchableOpacity>
        </View>

        {/* LISTAGEM */}
        <TransactionsList transactions={filteredTransactions} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    backgroundColor: "#fff",
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  pageTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
  },
  backButton: {
    fontSize: 30,
    fontWeight: "300",
  },
  newTransactionButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.xl,
  },
  newTransactionButtonText: {
    color: colors.text.white,
    fontWeight: "600",
    fontSize: 12,
  },
  listHeader: {
    flexDirection: "row",
    paddingVertical: spacing.md,
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  listHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
});
