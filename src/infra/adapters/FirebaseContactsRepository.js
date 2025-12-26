import { db } from "@core/config/firebaseConfig";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";

export class FirebaseContactsRepository {

  async listContacts(userId) {
    try {
      const q = query(
        collection(db, "contacts"),
        where("userId", "==", userId)
      );

      const snapshot = await getDocs(q);

      const contacts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, data: contacts };
    } catch (_error) {
      return { success: false, error: "Erro ao carregar contatos." };
    }
  }

  async findContact(userId, name) {
    try {
      const q = query(
        collection(db, "contacts"),
        where("userId", "==", userId),
        where("name", "==", name)
      );

      const snap = await getDocs(q);

      return { success: true, data: { exists: !snap.empty } };
    } catch (_error) {
      return { success: false, error: "Erro ao buscar contato." };
    }
  }

  async createContact({ userId, name }) {
    try {
      await addDoc(collection(db, "contacts"), {
        userId,
        name,
        initials: name[0]?.toUpperCase() ?? "?",
      });

      return { success: true };
    } catch (_error) {
      return { success: false, error: "Erro ao criar contato." };
    }
  }
}
