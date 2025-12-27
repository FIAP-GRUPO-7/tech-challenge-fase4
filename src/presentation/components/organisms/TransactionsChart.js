import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function TransactionsChart({ chartData, width, loading }) {
  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <LineChart
        data={chartData}
        width={width}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(64, 135, 249, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
}
