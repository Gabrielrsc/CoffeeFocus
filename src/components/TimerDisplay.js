import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatarTempo } from '../utils/timerHelper';
import { COLORS, FONTS } from '../styles/theme';

export const TimerDisplay = ({ segundos }) => {
  // Removido o useFonts daqui. O carregamento deve estar no App.js
  return <Text style={styles.timerTexto}>{formatarTempo(segundos)}</Text>;
};

const styles = StyleSheet.create({
  timerTexto: {
    fontFamily: FONTS.logo, // Centralizado
    fontSize: 90, // Aumentado um pouco para dar destaque
    fontWeight: 'bold',
    color: COLORS.textoEscuro,
  },
});