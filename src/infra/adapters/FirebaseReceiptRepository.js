import { storage, db } from "@core/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export class FirebaseReceiptRepository {
  async uploadReceipt(userId, transactionId, pdfUri) {
    try {
      const response = await fetch(pdfUri);
      const blob = await response.blob();

      const path = `users/${userId}/receipts/${transactionId}.pdf`;
      const fileRef = ref(storage, path);

      await uploadBytes(fileRef, blob);

      const url = await getDownloadURL(fileRef);

      const transRef = doc(db, "transactions", transactionId);
      await updateDoc(transRef, {
        pdfReceiptUrl: url,
        receiptUploaded: true,
      });

      return { success: true, url };
    } catch (error) {
      console.error("[FirebaseReceiptRepository] uploadReceipt", error);
      return { success: false, error: "Falha ao fazer upload do comprovante" };
    }
  }
}
