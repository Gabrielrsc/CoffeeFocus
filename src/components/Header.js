import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme'; // Usando as variáveis que criamos

export const Header = ({ focosConcluidos, abrirHistorico, abrirConfig }) => {
  return (
    <View style={styles.headerOuter}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          Coffee<Text style={styles.logoSpan}>Focus</Text>
        </Text>

        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.fogoBadge} onPress={abrirHistorico}>
            <MaterialCommunityIcons name="fire" size={18} color={COLORS.fogo} />
            <Text style={styles.fogoTexto}>{focosConcluidos}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnConfig} onPress={abrirConfig}>
            <Ionicons name="settings-sharp" size={22} color={COLORS.branco} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerOuter: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logo: {
    fontFamily: FONTS.logo,
    fontSize: 28,
    color: COLORS.textoEscuro,
  },
  logoSpan: {
    fontFamily: FONTS.mono, // Mudado para Mono para dar o estilo da Web
    fontSize: 16,
    color: COLORS.branco,
    marginLeft: 2,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fogoBadge: {
    backgroundColor: COLORS.textoEscuro,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50, // Pill shape
    gap: 6,
    elevation: 4, // Sombra no Android
  },
  fogoTexto: {
    color: COLORS.branco,
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 14,
  },
  btnConfig: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fundo translúcido como no seu CSS
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});