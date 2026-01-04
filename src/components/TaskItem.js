import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const TaskItem = ({ item, isAtiva, selecionar, editar, excluir }) => {
  return (
    <View style={[styles.container, isAtiva && styles.containerAtivo]}>
      <TouchableOpacity style={styles.touchArea} onPress={() => selecionar(item)}>
        <Ionicons 
          name={isAtiva ? "radio-button-on" : "radio-button-off"} 
          size={22} 
          color={isAtiva ? COLORS.foco : COLORS.textoEscuro} 
        />
        <View style={styles.content}>
          <Text style={[styles.titulo, isAtiva && styles.tituloAtivo]}>{item.titulo}</Text>
          <Text style={styles.progresso}>{item.focosRealizados}/{item.focosEstimados} focos</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => editar(item)} style={styles.btnAction}>
          <Ionicons name="create-outline" size={20} color={COLORS.textoEscuro} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => excluir(item.id)} style={styles.btnAction}>
          <Ionicons name="trash-outline" size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', padding: 12, borderRadius: 15, marginBottom: 8, width: '100%' },
  containerAtivo: { backgroundColor: COLORS.branco, borderLeftWidth: 5, borderLeftColor: COLORS.foco, elevation: 2 },
  touchArea: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1, marginLeft: 10 },
  titulo: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.textoEscuro },
  tituloAtivo: { fontWeight: 'bold' },
  progresso: { fontFamily: FONTS.mono, fontSize: 11, opacity: 0.5 },
  actions: { flexDirection: 'row', gap: 5 },
  btnAction: { padding: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10 }
});