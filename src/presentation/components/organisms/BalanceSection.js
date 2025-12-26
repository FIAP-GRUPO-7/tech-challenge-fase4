import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import OcultarSaldoIcon from '../../../assets/images/ocultar-saldo-preto.png';
import { colors } from '../../styles/theme';

export default function BalanceSection({ balance = 0, loading = false, showBalance = true, setShowBalance = () => {} }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <Text style={{ fontSize: 14, color: colors.text.secondary }}>Saldo Disponível:</Text>

      {loading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: colors.text.primary, fontSize: 16 }}>
            {showBalance ? `R$ ${balance.toFixed(2).replace('.', ',')}` : '●●●●●●'}
          </Text>

          <TouchableOpacity onPress={() => setShowBalance((s) => !s)} style={{ marginLeft: 8 }}>
            <Image source={OcultarSaldoIcon} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
