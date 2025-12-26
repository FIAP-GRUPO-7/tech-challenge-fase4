import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import ComprovanteIcon from '../../../assets/images/Icone de Comprovante.png';
import { colors, spacing, radius, fontSize } from '../../styles/theme';

export default function ReceiptActionFooter({ onPress }) {
  return (
    <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: '#eee' }}>
      <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: colors.secondary, paddingVertical: spacing.md, borderRadius: radius.lg, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
        <Image source={ComprovanteIcon} style={{ width: 22, height: 22, marginRight: spacing.sm }} />
        <Text style={{ color: colors.text.white, fontSize: fontSize.md, fontWeight: 'bold' }}>Visualizar / Salvar PDF</Text>
      </TouchableOpacity>
    </View>
  );
}
