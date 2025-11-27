import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@core/config/firebaseConfig";

export async function realizarDeposito(valor, userId) {
  try {
    if (!valor || valor <= 0) {
      throw new Error("Valor inválido para depósito.");
    }

    if (!userId) {
      throw new Error("ID de usuário inválido.");
    }

    const transacaoRef = doc(collection(db, "transacoes"));

    const contaRef = doc(db, "contas", userId);

    const transacaoPayload = {
      userId,
      tipo: "deposito",
      valor,
      status: "concluida",
      contaOrigemId: userId,
      contaDestinoId: userId,
      dataTransacao: serverTimestamp(),
    };

    const saldoUpdate = {
      saldo: increment(valor),
    };

    await setDoc(transacaoRef, transacaoPayload);
    await updateDoc(contaRef, saldoUpdate);

    console.log("[realizarDeposito] Depósito concluído com sucesso.");

    return {
      success: true,
      transacaoId: transacaoRef.id,
    };

  } catch (error) {
    console.error("[realizarDeposito ERRO]", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
