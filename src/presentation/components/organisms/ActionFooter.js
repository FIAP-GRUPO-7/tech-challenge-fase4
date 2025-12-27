import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, radius, fontSize } from '../../styles/theme';

export default function ActionFooter({ loading = false, onPress, title = 'Continuar' }) {
  return (
    <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: '#eee' }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={title}
          style={{ backgroundColor: colors.secondary, padding: spacing.lg, borderRadius: radius.lg, alignItems: 'center' }}
        >
          <Text style={{ color: colors.text.white, fontSize: fontSize.md, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
