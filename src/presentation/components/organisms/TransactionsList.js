import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { styles as homeStyles } from '../../styles/HomeStyles';
import { colors, fontSize, spacing } from '../../styles/theme';

const parseTimestamp = (ts) => {
  if (!ts) return null;
  if (typeof ts?.toMillis === 'function') return ts.toMillis();
  if (ts?.seconds !== undefined) {
    const seconds = Number(ts.seconds) || 0;
    const nanos = Number(ts.nanoseconds) || 0;
    return seconds * 1000 + Math.floor(nanos / 1e6);
  }
  if (typeof ts === 'number') return ts;
  const parsed = Date.parse(ts);
  return isNaN(parsed) ? null : parsed;
};

function TransactionRow({ item }) {
  const isExpense = (item.value || 0) < 0;
  const createdMs = parseTimestamp(item.createdAt);
  const formattedDate = createdMs ? new Date(createdMs).toLocaleDateString('pt-BR') : '—';

  return (
    <View
      style={[homeStyles.transactionRow, localStyles.transactionRow]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Transação ${item.type || item.recipient || ''} no dia ${formattedDate} valor ${item.value}`}
    >
      <Text style={localStyles.tableCell}>{formattedDate}</Text>
      <Text style={localStyles.tableCell}>{item.type || '—'}</Text>
      <Text style={[localStyles.tableCell, { color: isExpense ? colors.danger : colors.accent, fontWeight: 'bold' }]}> 
        {`${isExpense ? '-' : '+'}R$ ${Math.abs(item.value || 0).toFixed(2)}`}
      </Text>
    </View>
  );
}

const MemoizedRow = React.memo(TransactionRow, (a, b) => a.item?.id === b.item?.id && a.item?.value === b.item?.value);

export default function TransactionsList({ transactions = [], loading }) {
  const data = useMemo(() => transactions || [], [transactions]);

  const ListHeader = () => (
    <View style={localStyles.listHeader}>
      <Text style={localStyles.listHeaderText}>Data</Text>
      <Text style={localStyles.listHeaderText}>Tipo</Text>
      <Text style={localStyles.listHeaderText}>Valor</Text>
    </View>
  );

  return (
    <>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Carregando...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => <MemoizedRow item={item} />}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>Nenhuma transação encontrada</Text>}
          contentContainerStyle={{ paddingBottom: 150 }}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={21}
          getItemLayout={(d, index) => ({ length: 64, offset: 64 * index, index })}
        />
      )}
    </>
  );
}

const localStyles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  transactionRow: {
    // keep default from homeStyles, but allow overrides here
  },
});
