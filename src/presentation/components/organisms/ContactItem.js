import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../../styles/theme';

function ContactItemComponent({ item, onPress }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}
      onPress={() => onPress && onPress(item)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Contato ${item.name}`}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
        <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>{item.initials}</Text>
      </View>
      <Text style={{ fontSize: 16 }}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default React.memo(ContactItemComponent, (a, b) => a.item?.id === b.item?.id);
