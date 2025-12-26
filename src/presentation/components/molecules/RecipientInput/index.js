import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { fontSize, spacing } from '../../../styles/theme';

// A simple RecipientInput molecule: shows an input and a suggestions list
function RecipientInput({ value, onChange, contacts = [], placeholder = 'Nome ou chave Pix', style, accessibilityLabel }) {
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = (value || '').toLowerCase().trim();
    if (!q) return contacts.slice(0, 5);
    return contacts.filter(c => (c.name || '').toLowerCase().includes(q) || (c.key || '').toLowerCase().includes(q)).slice(0, 6);
  }, [value, contacts]);

  return (
    <View style={style}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel || placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderBottomWidth: 1,
          borderColor: '#E5E7EB',
          paddingVertical: spacing.md,
          fontSize: fontSize.md,
        }}
      />

      {focused && suggestions && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(i) => i.id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onChange && onChange(item.name || item.key || '');
                setFocused(false);
              }}
              style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Selecionar ${item.name || item.key}`}
            >
              <Text style={{ fontSize: fontSize.md }}>{item.name || item.key}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default React.memo(RecipientInput, (a, b) => a.value === b.value && (a.contacts?.length || 0) === (b.contacts?.length || 0));
