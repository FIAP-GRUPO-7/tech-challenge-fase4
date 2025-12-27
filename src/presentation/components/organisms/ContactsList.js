import React from 'react';
import { FlatList, Text } from 'react-native';
import ContactItem from './ContactItem';

export default function ContactsList({ contacts = [], loading, onSelect }) {
  if (loading) return <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando...</Text>;

  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => <ContactItem item={item} onPress={() => onSelect && onSelect(item.name)} />}
      keyExtractor={(i) => i.id}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum contato salvo.</Text>}
    />
  );
}
