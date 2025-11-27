import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@core/config/firebaseConfig";

export class FirebaseAuthRepository {
  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const result = await signInWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("[FirebaseAuthRepository] Login error:", error);
      throw new Error("Falha ao fazer login. Verifique suas credenciais.");
    }
  }

  async register(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("[FirebaseAuthRepository] Register error:", error);
      throw new Error("Falha ao registrar usuário.");
    }
  }

  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("[FirebaseAuthRepository] Logout error:", error);
      throw new Error("Falha ao sair da conta.");
    }
  }

  async listenAuthState(callback) {
    try {
      return onAuthStateChanged(auth, callback);
    } catch (error) {
      console.error("[FirebaseAuthRepository] ListenAuthState error:", error);
      throw new Error("Falha ao obter estado de autenticação.");
    }
  }
}
