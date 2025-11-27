import { getDocs } from "firebase/firestore";
import { db } from "@core/config/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  runTransaction,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export class FirebaseTransactionRepository {

  async createTransaction(transactionData) {
    try {
      if (!transactionData?.userId)
        throw new Error("UserId é obrigatório para registrar transação.");

      const ref = collection(db, "transactions");

      const payload = {
        ...transactionData,
        createdAt: serverTimestamp(),
      };

      const created = await addDoc(ref, payload);

      // pega o documento REAL
      const snap = await getDoc(created);

      return {
        success: true,
        data: {
          id: created.id,
          ...snap.data(),
        },
      };

    } catch (error) {
      console.error("[Repository:createTransaction]", error);
      return { success: false, error: "Falha ao registrar transação." };
    }
  }

  async listTransactions(userId) {
    try {
      if (!userId) throw new Error("UserId é obrigatório.");

      const ref = collection(db, "transactions");
      const q = query(
        ref,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      return list;

    } catch (error) {
      console.error("[FirebaseTransactionRepository] listTransactions:", error);
      return [];
    }
  }

  async getBalance(userId) {
    try {
      if (!userId) throw new Error("UserId é obrigatório.");

      const ref = doc(db, "contas", userId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        return { success: true, data: { saldo: 0 } };
      }

      const data = snap.data();
      const saldo = typeof data?.saldo === "number" ? data.saldo : 0;

      return { success: true, data: { saldo } };

    } catch (error) {
      console.error("[Repository:getBalance]", error);
      return { success: false, error: "Falha ao obter saldo." };
    }
  }

  async updateBalance(userId, value) {
    try {
      if (!userId) throw new Error("UserId é obrigatório.");
      if (typeof value !== "number") throw new Error("Valor inválido.");

      const contaRef = doc(db, "contas", userId);

      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(contaRef);

        if (!snap.exists()) {
          transaction.set(contaRef, { saldo: value });
        } else {
          const current = typeof snap.data().saldo === "number" ? snap.data().saldo : 0;
          transaction.update(contaRef, { saldo: current + value });
        }
      });

      return { success: true };

    } catch (error) {
      console.error("[Repository:updateBalance]", error);
      return { success: false, error: "Falha ao atualizar saldo." };
    }
  }

  watchTransactions(userId, onData, onError) {
    try {
      if (!userId) throw new Error("UserId é obrigatório.");

      const ref = collection(db, "transactions");

      const q = query(
        ref,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          onData(list);
        },
        (err) => {
          console.error("[Repository:watchTransactions]", err);
          onError && onError(err);
        }
      );

      return unsubscribe;

    } catch (error) {
      console.error("[Repository:watchTransactions:error]", error);
      onError && onError(error);
    }
  }
}
