import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@core/config/firebaseConfig";

export const registerUser = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) throw new Error("Erro ao criar usuário.");

    const uid = user.uid;

    await updateProfile(user, { displayName: fullName });
    console.log("[registerUser] Nome atualizado:", fullName);

    await setDoc(doc(db, "contas", uid), {
      nome: fullName,
      saldo: 2500,
      userId: uid,
      ultimaAtualizacao: new Date(),
    });

    console.log("[registerUser] Conta criada com saldo inicial de R$ 2.500");

    await addDoc(collection(db, "transactions"), {
      userId: uid,
      value: 2500,
      type: "Depósito Inicial",
      createdAt: serverTimestamp(),
    });

    console.log("[registerUser] Transação inicial registrada");

    return user;
  } catch (err) {
    console.error(`[registerUser] ERRO: ${err.message}`);
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("[loginUser] Login bem-sucedido");
    return userCredential.user;
  } catch (err) {
    console.error(`[loginUser] ERRO: ${err.message}`);
    throw new Error("Email ou senha inválidos.");
  }
};
