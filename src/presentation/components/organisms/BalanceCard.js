import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles as homeStyles } from '../../styles/HomeStyles';
import OcultarSaldoIcon from '../../../assets/images/ocultar-saldo-branco.png';

function BalanceCard({ balance = 0, showBalance = true, onToggle }) {
  return (
    <View style={homeStyles.card} accessible accessibilityLabel={`Saldo disponível ${showBalance ? `R$ ${balance.toFixed(2).replace('.', ',')}` : 'oculto'}`}>
      <View style={homeStyles.balanceRow}>
        <View>
          <Text style={homeStyles.cardText}>Saldo disponível</Text>
          <Text style={homeStyles.cardAmount}>
            {showBalance ? `R$ ${balance.toFixed(2).replace('.', ',')}` : '●●●●●●'}
          </Text>
          <Text style={homeStyles.cardSubtitle}>Conta Corrente</Text>
        </View>
        <TouchableOpacity onPress={onToggle} accessibilityRole="button" accessibilityLabel="Alternar exibição do saldo">
          <Image source={OcultarSaldoIcon} style={homeStyles.eyeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(BalanceCard, (a, b) => a.balance === b.balance && a.showBalance === b.showBalance);
