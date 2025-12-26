import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@core/config/firebaseConfig";
import * as FileSystem from "expo-file-system";

async function _upload(storagePath, blob) {
  try {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`📤 Upload: ${progress.toFixed(0)}% concluído`);
        },
        (error) => {
          console.error("❌ Erro no upload:", error);
          reject(new Error("Falha ao enviar o arquivo para o Firebase Storage."));
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(`✅ Upload concluído. URL: ${url}`);
          resolve(url);
        }
      );
    });
  } catch (error) {
    console.error("❌ Erro interno no processo de upload:", error);
    throw new Error("Erro ao preparar o upload.");
  }
}

export async function uploadFileFromBlob(fileBlob, fileName, userId) {
  const path = `comprovantes/${userId}/${fileName}`;
  return _upload(path, fileBlob);
}

export async function uploadFileFromUri(fileUri, fileName, userId) {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const path = `comprovantes/${userId}/${fileName}`;
    return _upload(path, blob);
  } catch (error) {
    console.error("❌ Erro ao converter URI em Blob:", error);
    throw new Error("Não foi possível ler o arquivo selecionado.");
  }
}

export async function downloadFileToLocal(storagePath, localFileName) {
  try {
    const fileRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(fileRef);

    const localUri = FileSystem.documentDirectory + localFileName;

    console.log(`⬇️ Baixando arquivo de ${downloadURL}`);
    const { uri } = await FileSystem.downloadAsync(downloadURL, localUri);

    console.log(`📁 Arquivo salvo em: ${uri}`);
    return uri;
  } catch (error) {
    console.error("❌ Erro ao baixar arquivo:", error);
    throw new Error("Falha ao baixar o arquivo do Firebase Storage.");
  }
}
