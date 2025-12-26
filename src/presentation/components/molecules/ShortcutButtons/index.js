import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ShortcutButtons({ items = [], onPress, style, itemStyle, textStyle }) {
  return (
    <View style={[styles.container, style]} accessible accessibilityRole="toolbar">
      {items.map((it, i) => (
        <TouchableOpacity key={i} style={[styles.button, itemStyle]} onPress={() => onPress && onPress(it)}>
          <Text style={[styles.label, textStyle]}>{it}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
