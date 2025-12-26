import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CloseButton({ onPress, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{ fontSize: 25 }}>×</Text>
    </TouchableOpacity>
  );
}
