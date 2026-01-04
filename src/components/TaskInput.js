import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const TaskInput = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={24} color={COLORS.textoEscuro} />
      <Text style={styles.text}>Adicionar nova tarefa</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.textoEscuro,
  },
  text: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.textoEscuro,
    marginLeft: 10,
    fontWeight: 'bold'
  }
});