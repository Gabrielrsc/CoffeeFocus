import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const SettingsModal = ({ visivel, fechar, salvar, temposAtuais, somAtivo, onExcluirHistorico, onExcluirTarefas, onResetTotal }) => {
  const [foco, setFoco] = useState('');
  const [curto, setCurto] = useState('');
  const [longo, setLongo] = useState('');
  const [som, setSom] = useState(somAtivo);

  useEffect(() => {
    setFoco((temposAtuais.foco / 60).toString());
    setCurto((temposAtuais.curto / 60).toString());
    setLongo((temposAtuais.longo / 60).toString());
    setSom(somAtivo);
  }, [visivel, temposAtuais, somAtivo]);

  return (
    <Modal visible={visivel} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Configurações</Text>
          <TouchableOpacity onPress={fechar}><Ionicons name="close" size={32} color={COLORS.textoEscuro} /></TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionLabel}>TEMPOS PADRÃO (MINUTOS)</Text>
          <View style={styles.row}>
            { [['Foco', foco, setFoco], ['Curto', curto, setCurto], ['Longo', longo, setLongo]].map(([label, val, setter], i) => (
              <View key={i} style={styles.inputGroup}>
                <Text style={styles.miniLabel}>{label}</Text>
                <TextInput style={styles.input} value={val} onChangeText={setter} keyboardType="numeric" maxLength={3} />
              </View>
            ))}
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>PREFERÊNCIAS</Text>
          <TouchableOpacity style={[styles.soundButton, !som && {opacity: 0.6}]} onPress={() => setSom(!som)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name={som ? "volume-high" : "volume-mute"} size={24} color={som ? COLORS.foco : COLORS.textoEscuro} />
              <View style={{marginLeft: 15}}><Text style={styles.soundTitle}>Efeitos Sonoros</Text><Text style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.foco}}>{som ? 'Ativados' : 'Desativados'}</Text></View>
            </View>
            <View style={[styles.toggle, som ? {backgroundColor: COLORS.foco, alignItems: 'flex-end'} : {backgroundColor: '#ccc', alignItems: 'flex-start'}]}><View style={styles.toggleCircle} /></View>
          </TouchableOpacity>

          <View style={styles.dangerZone}>
            <Text style={styles.dangerTitle}>ZONA DE PERIGO</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <TouchableOpacity style={styles.btnDangerSmall} onPress={onExcluirHistorico}><Ionicons name="calendar-outline" size={18} color="#e74c3c" /><Text style={styles.textExcluir}>HISTÓRICO</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btnDangerSmall} onPress={onExcluirTarefas}><Ionicons name="list-outline" size={18} color="#e74c3c" /><Text style={styles.textExcluir}>TAREFAS</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnResetTotal} onPress={onResetTotal}><Ionicons name="refresh-circle-outline" size={22} color="#fff" /><Text style={styles.textReset}>RESTAURAR DEFINIÇÕES DE FÁBRICA</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnSalvar} onPress={() => salvar({ tempos: {foco: parseInt(foco)*60, curto: parseInt(curto)*60, longo: parseInt(longo)*60}, somHabilitado: som })}>
            <Text style={styles.btnTexto}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.branco },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  titulo: { fontFamily: FONTS.logo, fontSize: 28, color: COLORS.textoEscuro },
  scrollContent: { padding: 25 },
  sectionLabel: { fontFamily: FONTS.mono, fontSize: 12, opacity: 0.5, marginBottom: 15, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inputGroup: { width: '30%' },
  miniLabel: { fontFamily: FONTS.mono, fontSize: 12, textAlign: 'center', marginBottom: 8 },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 15, textAlign: 'center', fontFamily: FONTS.mono, fontSize: 16 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  soundButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f9f9f9', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
  soundTitle: { fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold' },
  toggle: { width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center' },
  toggleCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  dangerZone: { marginTop: 40, paddingTop: 30, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  dangerTitle: { fontFamily: FONTS.mono, fontSize: 12, color: '#e74c3c', marginBottom: 15, fontWeight: 'bold' },
  btnDangerSmall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#e74c3c', backgroundColor: '#fff5f5', width: '48%' },
  btnResetTotal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 15, backgroundColor: '#e74c3c' },
  textExcluir: { color: '#e74c3c', fontFamily: FONTS.mono, fontSize: 10, fontWeight: 'bold', marginLeft: 8 },
  textReset: { color: '#fff', fontFamily: FONTS.mono, fontSize: 11, fontWeight: 'bold', marginLeft: 10 },
  btnSalvar: { backgroundColor: COLORS.textoEscuro, padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 40 },
  btnTexto: { color: '#fff', fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold' },
});