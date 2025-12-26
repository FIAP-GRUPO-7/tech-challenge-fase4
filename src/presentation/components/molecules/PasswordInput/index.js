import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { spacing } from '../../../styles/theme';

export default function PasswordInput({ value, onChangeText, placeholder = 'Senha', accessibilityLabel }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 8 }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!visible}
          accessibilityLabel={accessibilityLabel || placeholder}
          style={{ flex: 1, paddingVertical: 10 }}
        />

        <TouchableOpacity onPress={() => setVisible((v) => !v)} accessibilityRole="button" accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}>
          <Text style={{ color: '#374151', padding: 8 }}>{visible ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
