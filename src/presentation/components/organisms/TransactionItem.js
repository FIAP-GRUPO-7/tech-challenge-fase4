import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/HomeStyles';

function TransactionItemComponent({ item }) {
  const value = item.value || 0;
  const isExpense = value < 0;

  const createdMs = item.createdAt || item.createdAtMillis || null;
  const dateStr = createdMs ? new Date(createdMs).toLocaleDateString('pt-BR') : '—';

  return (
    <View
      style={styles.transactionRow}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Transação ${item.type || item.recipient || ''} em ${dateStr} valor ${value}`}
    >
      <Text style={styles.transactionText}>{dateStr}</Text>
      <Text style={styles.transactionText}>{item.type || item.recipient || '—'}</Text>
      <Text style={isExpense ? styles.transactionValueNegative : styles.transactionValuePositive}>
        {`${isExpense ? '-' : '+'}R$ ${Math.abs(value).toFixed(2)}`}
      </Text>
    </View>
  );
}

const areEqual = (prevProps, nextProps) => {
  const prev = prevProps.item || {};
  const next = nextProps.item || {};
  const prevCreated = prev.createdAt || prev.createdAtMillis;
  const nextCreated = next.createdAt || next.createdAtMillis;
  return prev.id === next.id && prev.value === next.value && prevCreated === nextCreated;
};

export const TransactionItem = React.memo(TransactionItemComponent, areEqual);

export default TransactionItem;
