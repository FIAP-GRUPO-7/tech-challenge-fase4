import React, { useState } from 'react';
import { Platform, View, Text, Button as RNButton, ActivityIndicator, StyleSheet } from 'react-native';
import FileInputWeb from './FileInputWeb';
import { pickFilesMobile } from './FilePickerMobile';
import { uploadFileFromBlob } from '@infra/services/storageService';
import { colors } from '../../../styles/theme';

export default function FileUploader({ user, onUploadSuccess }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleWebFiles = (files) => {
    setSelectedFiles(files);
    setUploadStatus(files.map((f) => ({ name: f.name, status: 'Pronto para enviar', url: null })));
  };

  const handleMobilePick = async () => {
    const files = await pickFilesMobile();
    setSelectedFiles(files);
    setUploadStatus(files.map((f) => ({ name: f.name, status: 'Pronto para enviar', url: null })));
  };

  const handleUpload = async () => {
    if (!user?.uid) {
      alert('Usuário não autenticado.');
      return;
    }
    if (selectedFiles.length === 0) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    setIsUploading(true);
    const statuses = [...uploadStatus];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        statuses[i].status = 'Enviando...';
        setUploadStatus([...statuses]);

        const downloadUrl = await uploadFileFromBlob(file, file.name, user.uid);

        statuses[i].status = 'Sucesso!';
        statuses[i].url = downloadUrl;
        onUploadSuccess && onUploadSuccess(downloadUrl);
      } catch (err) {
        statuses[i].status = `Falha: ${err.message}`;
        console.error('upload error', err);
      }
      setUploadStatus([...statuses]);
    }

    setIsUploading(false);
    setSelectedFiles([]);
    setUploadStatus([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Comprovantes</Text>

      {Platform.OS === 'web' ? (
        <FileInputWeb onChange={handleWebFiles} disabled={isUploading} />
      ) : (
        <RNButton title="Selecionar Documento" onPress={handleMobilePick} disabled={isUploading} color={colors.accent} />
      )}

      {selectedFiles.length > 0 && (
        <View style={styles.fileListContainer}>
          <Text style={styles.subtitle}>Arquivos Selecionados:</Text>
          {selectedFiles.map((file, idx) => (
            <Text key={(file.name || file.uri) + idx} style={styles.fileItem}>- {file.name || file.uri}</Text>
          ))}
        </View>
      )}

      {uploadStatus.length > 0 && (
        <View style={styles.statusContainer}>
          <Text style={styles.subtitle}>Status do Upload:</Text>
          {uploadStatus.map((s, idx) => (
            <Text key={s.name + idx} style={styles.statusItem}>{s.name}: {s.status}</Text>
          ))}
        </View>
      )}

      <RNButton title={isUploading ? 'Enviando...' : 'Enviar Arquivos'} onPress={handleUpload} disabled={selectedFiles.length === 0 || isUploading} color={colors.accent} />

      {isUploading && <ActivityIndicator size="small" color={colors.accent} style={{ marginTop: 10 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginVertical: 8 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: colors.primary },
  subtitle: { fontSize: 14, fontWeight: '600', marginTop: 8, marginBottom: 6 },
  fileListContainer: { marginTop: 8, padding: 8, backgroundColor: '#f7f7f7', borderRadius: 6 },
  fileItem: { fontSize: 14, marginBottom: 4 },
  statusContainer: { marginTop: 8, padding: 8, backgroundColor: '#e8f6ff', borderRadius: 6 },
  statusItem: { fontSize: 13 },
});
