import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/HomeStyles';

function TransactionItemComponent({ item }) {
  const value = item.value || 0;
  const isExpense = value < 0;

  const dateStr = new Date(item.createdAtMillis).toLocaleDateString('pt-BR');

  return (
    <View style={styles.transactionRow}>
      <Text style={styles.transactionText}>{dateStr}</Text>
      <Text style={styles.transactionText}>{item.type || item.recipient || '—'}</Text>
      <Text style={isExpense ? styles.transactionValueNegative : styles.transactionValuePositive}>
        {`${isExpense ? '-' : '+'}R$ ${Math.abs(value).toFixed(2)}`}
      </Text>
    </View>
  );
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.item?.id === nextProps.item?.id && prevProps.item?.value === nextProps.item?.value && prevProps.item?.createdAtMillis === nextProps.item?.createdAtMillis;
};

export const TransactionItem = React.memo(TransactionItemComponent, areEqual);

export default TransactionItem;
