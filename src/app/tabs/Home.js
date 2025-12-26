import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Animated, { FadeInUp, FadeInDown, FadeInRight } from "react-native-reanimated";

import AvatarImg from "../../assets/images/Avatar.png";
import OcultarSaldoIcon from "../../assets/images/ocultar-saldo-branco.png";

import { useAuth } from "../../presentation/hooks/useAuth";
import { useAuthGuard } from "../../presentation/hooks/useAuthGuard";

import { styles } from "../../presentation/styles/HomeStyles";
import { colors } from "../../presentation/styles/theme";

import { makeWatchTransactionsUseCase } from "../../main/factories/transactions/makeWatchTransactionsUseCase";
import { makeGetBalanceUseCase } from "../../main/factories/transactions/makeGetBalanceUseCase";
import { makeCreateInitialDepositUseCase } from "../../main/factories/transactions/makeCreateInitialDepositUseCase";

import { LineChart } from "react-native-chart-kit";
import { TransactionItem } from "../../presentation/components/organisms";

const extractNameFromEmail = (email) => {
  if (!email) return "";
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default function Home() {
  useAuthGuard();

  const { user, logout } = useAuth();
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [0] }],
  });

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (!user?.uid) return;

    const getBalanceUseCase = makeGetBalanceUseCase();
    const createInitialDepositUseCase = makeCreateInitialDepositUseCase();

    async function loadBalance() {
      try {
        const res = await getBalanceUseCase.execute(user.uid);

        if (!res || res.success === false) {
          await createInitialDepositUseCase.execute(user.uid);
          setBalance(2500);
          return;
        }

        const serverSaldo = res.data?.saldo;
        if (serverSaldo === undefined || serverSaldo === null) {
          await createInitialDepositUseCase.execute(user.uid);
          setBalance(2500);
        } else {
          setBalance(Number(serverSaldo) || 0);
        }

      } catch (e) {
        console.error("loadBalance ERROR:", e);
      }
    }

    loadBalance();
  }, [user]);

  useEffect(() => {
    if (!user?.uid) return;

    const watchTransactionsUseCase = makeWatchTransactionsUseCase();

    const unsubscribe = watchTransactionsUseCase.execute(
      user.uid,
      (rawTxs) => {
        const txs = rawTxs.map((t) => {
          const value = Number(t?.value) || 0;

          let createdAtMillis = null;

          if (t?.createdAt?.toMillis) {
            createdAtMillis = t.createdAt.toMillis();
          }
          else if (t?.createdAt?.seconds) {
            createdAtMillis = t.createdAt.seconds * 1000;
          }
          else {
            createdAtMillis = t.__localCreatedAt || Date.now();
          }

          return {
            ...t,
            value,
            createdAtMillis,
          };
        });

        setTransactions(txs);

        const chartable = txs
          .slice() // copia
          .sort((a, b) => a.createdAtMillis - b.createdAtMillis)
          .slice(-7);

        if (chartable.length > 0) {
          setChartData({
            labels: chartable.map((t) =>
              new Date(t.createdAtMillis).toLocaleDateString("pt-BR", { day: "2-digit" })
            ),
            datasets: [
              { data: chartable.map((t) => t.value) }
            ],
          });
        } else {
          setChartData({
            labels: [],
            datasets: [{ data: [0] }],
          });
        }

        setLoading(false);
      },
      (err) => {
        console.error("watch TX ERROR:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [user]);

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

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(64, 135, 249, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

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

      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={AvatarImg} style={styles.avatar} />
          <Text style={styles.headerText}>Olá, {extractNameFromEmail(user?.email)}</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible((v) => !v)}>
          <Text style={{ color: colors.text.black, fontSize: 22 }}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 32 }}>
        <Animated.View style={styles.card} entering={FadeInDown.duration(600)}>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.cardText}>Saldo disponível</Text>
              <Text style={styles.cardAmount}>
                {showBalance ? `R$ ${balance.toFixed(2).replace(".", ",")}` : "●●●●●●"}
              </Text>
              <Text style={styles.cardSubtitle}>Conta Corrente</Text>
            </View>
            <TouchableOpacity onPress={() => setShowBalance((s) => !s)}>
              <Image source={OcultarSaldoIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.summaryCard}>
          <Text style={styles.transactionTitle}>Atividade Recente</Text>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <LineChart
              data={chartData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          )}
        </View>

        <View style={styles.shortcutsContainer}>
          {["Pix", "Transferir", "Investir"].map((item, i) => (
            <TouchableOpacity key={i} style={styles.shortcut} onPress={() => handleShortcutPress(item)}>
              <Text style={styles.shortcutText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
