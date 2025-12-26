import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Animated, { FadeInUp, FadeInDown, FadeInRight } from "react-native-reanimated";

import useBalance from "../../presentation/hooks/useBalance";

import { useAuth } from "../../presentation/hooks/useAuth";
import { useAuthGuard } from "../../presentation/hooks/useAuthGuard";

import { styles } from "../../presentation/styles/HomeStyles";
import { colors } from "../../presentation/styles/theme";

import useTransactions from "../../presentation/hooks/useTransactions";
import { BalanceCard, TransactionsChart, TransactionItem, Header } from "../../presentation/components/organisms";
import { ShortcutButtons } from "../../presentation/components/molecules";


export default function Home() {
  useAuthGuard();

  const { user, logout } = useAuth();
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);
  const { transactions, loading } = useTransactions(user);

  const { balance, loading: balanceLoading } = useBalance(user);
  const [showBalance, setShowBalance] = useState(true);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [0] }],
  });

  const screenWidth = Dimensions.get("window").width;

  

  useEffect(() => {
    const chartable = (transactions || [])
      .slice()
      .sort((a, b) => (a.createdAt || a.createdAtMillis || 0) - (b.createdAt || b.createdAtMillis || 0))
      .slice(-7);

    if (chartable.length > 0) {
      setChartData({
        labels: chartable.map((t) => new Date(t.createdAt || t.createdAtMillis).toLocaleDateString('pt-BR', { day: '2-digit' })),
        datasets: [{ data: chartable.map((t) => t.value) }],
      });
    } else {
      setChartData({ labels: [], datasets: [{ data: [0] }] });
    }
  }, [transactions]);

  const handleShortcutPress = useCallback(
    (key) => {
      if (["Transferir", "Pix", "Investir"].includes(key)) {
        router.push("/tabs/add");
      } else {
        router.push("/tabs/list");
      }
    },
    [router]
  );

  const renderTx = useCallback(
    ({ item }) => (
      <Animated.View entering={FadeInRight.duration(400)}>
        <TransactionItem item={item} />
      </Animated.View>
    ),
    []
  );

  

  return (
    <Animated.View style={styles.container} entering={FadeInUp.duration(500)}>
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.dropdownClose} onPress={() => setMenuVisible(false)}>
            <Text style={{ color: colors.text.white, fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownLogout} onPress={logout}>
            <Text style={styles.dropdownLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      <Header user={user} menuVisible={menuVisible} setMenuVisible={setMenuVisible} logout={logout} />

      <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 32 }}>
        <Animated.View style={styles.card} entering={FadeInDown.duration(600)}>
          <BalanceCard balance={balance} loading={balanceLoading} showBalance={showBalance} onToggle={() => setShowBalance((s) => !s)} />
        </Animated.View>

        <View style={styles.summaryCard}>
          <Text style={styles.transactionTitle}>Atividade Recente</Text>
          <TransactionsChart chartData={chartData} width={screenWidth - 64} loading={loading} />
        </View>

        <ShortcutButtons
          items={["Pix", "Transferir", "Investir"]}
          onPress={handleShortcutPress}
          style={styles.shortcutsContainer}
          itemStyle={styles.shortcut}
          textStyle={styles.shortcutText}
        />

        <View style={styles.summaryCard}>
          <Text style={styles.transactionTitle}>Transações recentes</Text>

          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsHeaderText}>Data</Text>
            <Text style={styles.transactionsHeaderText}>Tipo</Text>
            <Text style={styles.transactionsHeaderText}>Valor</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={colors.secondary} />
          ) : transactions.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma transação ainda.</Text>
          ) : (
            <FlatList
              data={transactions.slice(0, 5)}
              keyExtractor={(t) => t.id}
              renderItem={renderTx}
              scrollEnabled={false}
            />
          )}

          <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push("/tabs/list")}>
            <Text style={styles.seeAllText}>Ver todas as transações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
