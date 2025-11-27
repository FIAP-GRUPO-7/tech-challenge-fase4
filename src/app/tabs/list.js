import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useAuth } from "../../presentation/hooks/useAuth";
import { useAuthGuard } from "../../presentation/hooks/useAuthGuard";

import AvatarImg from "../../assets/images/Avatar.png";
import { styles as homeStyles } from "../../presentation/styles/HomeStyles";
import { colors, fontSize, radius, spacing } from "../../presentation/styles/theme";

import { makeWatchTransactionsUseCase } from "../../main/factories/transactions/makeWatchTransactionsUseCase";

const CATEGORIAS = ["Todos", "Compras", "Salário", "Transporte", "Transferência", "Depósito"];
const TIPOS = ["Todos", "Entradas", "Saídas"];

export default function Transactions() {
  useAuthGuard();
  const router = useRouter();
  const { user } = useAuth();

  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

  const [categoryButtonLayout, setCategoryButtonLayout] = useState(null);
  const [typeButtonLayout, setTypeButtonLayout] = useState(null);

  const categoryButtonRef = useRef(null);
  const typeButtonRef = useRef(null);

  const extractNameFromEmail = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  useEffect(() => {
    if (!user?.uid) return;

    const watchTransactionsUseCase = makeWatchTransactionsUseCase();

    const unsubscribe = watchTransactionsUseCase.execute(
      user.uid,
      (transactions) => {
        setAllTransactions(transactions);
        setLoading(false);
      },
      (errorMsg) => {
        console.error("Erro ao carregar transações:", errorMsg);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const filteredTransactions = useMemo(() => {
    let tx = [...allTransactions];

    if (searchQuery) {
      tx = tx.filter(t =>
        (t.type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.recipient || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType === "Entradas") tx = tx.filter(t => t.value >= 0);
    if (selectedType === "Saídas") tx = tx.filter(t => t.value < 0);

    if (selectedCategory !== "Todos") tx = tx.filter(t => t.type === selectedCategory);

    if (selectedDate) {
      tx = tx.filter(t =>
        t.createdAt &&
        new Date(t.createdAt).toLocaleDateString("pt-BR") ===
        selectedDate.toLocaleDateString("pt-BR")
      );
    }

    return tx;
  }, [allTransactions, searchQuery, selectedType, selectedCategory, selectedDate]);

  const renderTx = ({ item }) => {
    const isExpense = item.value < 0;
    const valueColor = isExpense ? colors.danger : colors.accent;

    const formattedValue =
      `${isExpense ? "-" : "+"}R$ ${Math.abs(item.value).toFixed(2)}`;

    const formattedDate = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("pt-BR")
      : "—";

    return (
      <View style={styles.transactionRow}>
        <Text style={styles.tableCell}>{formattedDate}</Text>
        <Text style={styles.tableCell}>{item.type || "—"}</Text>
        <Text style={[styles.tableCell, { color: valueColor, fontWeight: "bold" }]}>
          {formattedValue}
        </Text>
      </View>
    );
  };

  const ListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>Data</Text>
      <Text style={styles.listHeaderText}>Tipo</Text>
      <Text style={styles.listHeaderText}>Valor</Text>
    </View>
  );

  return (
    <View style={homeStyles.container}>

      {/* HEADER */}
      <View style={homeStyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={AvatarImg} style={homeStyles.avatar} />
          <Text style={homeStyles.headerText}>
            Olá, {extractNameFromEmail(user?.email)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => { }}>
          <Text style={{ color: colors.text.black, fontSize: 22 }}>☰</Text>
        </TouchableOpacity>
      </View>

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
        {loading ? (
          <ActivityIndicator style={{ marginTop: 50 }} size="large" color={colors.secondary} />
        ) : (
          <FlatList
            data={filteredTransactions}
            keyExtractor={(t) => t.id}
            renderItem={renderTx}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 50 }}>
                Nenhuma transação encontrada
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}
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
