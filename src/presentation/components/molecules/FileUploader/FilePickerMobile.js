import * as DocumentPicker from 'expo-document-picker';

export async function pickFilesMobile() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      multiple: true,
    });

    if (result.canceled) return [];

    return result.assets || (result.name ? [result] : []);
  } catch (err) {
    console.error('pickFilesMobile error', err);
    return [];
  }
}
