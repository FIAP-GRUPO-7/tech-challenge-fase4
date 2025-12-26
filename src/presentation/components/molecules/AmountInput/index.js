import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { formatCurrencyBR } from '../../../../core/utils/formatters';
import { spacing } from '../../../styles/theme';

export default function AmountInput({ value = 0, onChangeValue, placeholder = 'R$ 0,00', style, accessibilityLabel }) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    setDisplay(value ? formatCurrencyBR(value) : '');
  }, [value]);

  const handleChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned === '') {
      setDisplay('');
      onChangeValue && onChangeValue(0);
      return;
    }

    const num = parseInt(cleaned, 10) / 100;
    setDisplay(formatCurrencyBR(num));
    onChangeValue && onChangeValue(num);
  };

  return (
    <View style={style}>
      <TextInput
        value={display}
        onChangeText={handleChange}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel || placeholder}
        keyboardType="numeric"
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderColor: '#ccc',
          paddingBottom: spacing.sm,
          color: '#000',
        }}
      />
    </View>
  );
}
