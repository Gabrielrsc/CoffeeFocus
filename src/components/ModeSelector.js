import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { CONFIGS, COLORS, FONTS } from '../styles/theme'; // Importe COLORS e FONTS

export const ModeSelector = ({ contexto, mudarModo }) => {
  return (
    <View style={styles.container}>
      {Object.keys(CONFIGS).map((modo) => {
        const item = CONFIGS[modo];
        const isActive = contexto === modo;

        return (
          <TouchableOpacity
            key={modo}
            style={[styles.botao, isActive && styles.botaoAtivo]}
            onPress={() => mudarModo(modo)}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={18} 
              color={isActive ? COLORS.textoEscuro : 'rgba(61, 38, 38, 0.4)'} 
            />
            
            <Text style={[styles.texto, isActive && styles.textoAtivo]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 25,
    justifyContent: 'center',
    width: '100%',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    gap: 6,
  },
  botaoAtivo: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  texto: {
    color: COLORS.textoEscuro, // Usando tema
    opacity: 0.5,
    fontSize: 13,
    fontFamily: FONTS.mono, // Usando variável centralizada
  },
  textoAtivo: {
    opacity: 1,
    fontFamily: FONTS.monoBold, // Mudando para a versão Bold da fonte Mono
  },
});