import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AvatarImg from '../../../assets/images/Avatar.png';
import { styles as homeStyles } from '../../styles/HomeStyles';
import { colors } from '../../styles/theme';

export default function Header({ user, menuVisible, setMenuVisible, logout }) {
  const extractNameFromEmail = (email) => {
    if (!email) return '';
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <>
      {menuVisible && (
        <View style={homeStyles.dropdownMenu}>
          <TouchableOpacity style={homeStyles.dropdownClose} onPress={() => setMenuVisible(false)}>
            <Text style={{ color: colors.text.white, fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyles.dropdownLogout} onPress={logout}>
            <Text style={homeStyles.dropdownLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={homeStyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={AvatarImg} style={homeStyles.avatar} />
          <Text style={homeStyles.headerText}>Olá, {extractNameFromEmail(user?.email)}</Text>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible((v) => !v)}>
          <Text style={{ color: colors.text.black, fontSize: 22 }}>☰</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
