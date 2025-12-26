import React from 'react';
import { View, Text } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../styles/theme';

export default function ReceiptCard({ numericValue = 0, recipient = '', formattedDate = '', transactionId = '' }) {
  return (
    <View style={{ backgroundColor: colors.text.white, borderRadius: radius.lg, padding: spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
        <Text style={{ fontSize: fontSize.md, color: colors.text.secondary }}>Valor</Text>
        <Text style={{ fontSize: fontSize.lg, fontWeight: 'bold', color: colors.primary }}>R$ {numericValue.toFixed(2).replace('.', ',')}</Text>
      </View>

      <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: spacing.sm }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
        <Text style={{ fontSize: fontSize.md, color: colors.text.secondary }}>Recebedor</Text>
        <Text style={{ fontSize: fontSize.md, fontWeight: '600' }}>{recipient}</Text>
      </View>

      <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: spacing.sm }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
        <Text style={{ fontSize: fontSize.md, color: colors.text.secondary }}>Data e hora</Text>
        <Text style={{ fontSize: fontSize.sm }}>{formattedDate}</Text>
      </View>

      <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: spacing.sm }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
        <Text style={{ fontSize: fontSize.md, color: colors.text.secondary }}>ID da Transação</Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.text.muted }}>{transactionId}</Text>
      </View>
    </View>
  );
}
