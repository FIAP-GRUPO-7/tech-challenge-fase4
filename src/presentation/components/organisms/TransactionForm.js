import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '../../styles/theme';
import { AmountInput, FileUploader } from '../molecules';

export default function TransactionForm({ recipient, user, value, onChangeValue, onUploadSuccess }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, color: '#6B7280' }}>Transferindo para:</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: spacing.lg, borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: spacing.md }}>{recipient}</Text>

      <Text style={{ color: '#6B7280', fontSize: 12, marginBottom: 6 }}>Valor</Text>
      <AmountInput value={value} onChangeValue={onChangeValue} accessibilityLabel="Valor da transferência" />

      <View style={{ marginTop: spacing.xl }}>
        {user && (
          <FileUploader user={user} onUploadSuccess={onUploadSuccess} />
        )}
      </View>
    </View>
  );
}
