import React from 'react';
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, className = "", accessibilityLabel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      className={`bg-blue-600 rounded-lg py-3 px-4 items-center ${className}`}
    >
      <Text className="text-white font-bold">{title}</Text>
    </TouchableOpacity>
  );
}
