import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';
import { AboutModal } from './AboutModal';

export const SettingsModal = ({ 
  visivel, 
  fechar, 
  salvar, 
  temposAtuais, 
  somAtivo, 
  onExcluirHistorico,
  onExcluirTarefas,
  onResetTotal
}) => {
  const [foco, setFoco] = useState('');
  const [curto, setCurto] = useState('');
  const [longo, setLongo] = useState('');
  const [som, setSom] = useState(somAtivo);
  const [modalAboutVisivel, setModalAboutVisivel] = useState(false);

  useEffect(() => {
    if (visivel) {
      setFoco((temposAtuais.foco / 60).toString());
      setCurto((temposAtuais.curto / 60).toString());
      setLongo((temposAtuais.longo / 60).toString());
      setSom(somAtivo);
    }
  }, [visivel, temposAtuais, somAtivo]);

  const handleSalvar = () => {
    salvar({
      tempos: {
        foco: (parseInt(foco) || 25) * 60,
        curto: (parseInt(curto) || 5) * 60,
        longo: (parseInt(longo) || 15) * 60,
      },
      somHabilitado: som
    });
    Alert.alert("Sucesso", "Configurações salvas!");
  };

  // FUNÇÕES DE CONFIRMAÇÃO PARA A ZONA DE PERIGO
  const confirmarExclusaoHistorico = () => {
    Alert.alert(
      "Limpar Histórico",
      "Deseja apagar todos os registros de sessões passadas?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: onExcluirHistorico }
      ]
    );
  };

  const confirmarExclusaoTarefas = () => {
    Alert.alert(
      "Limpar Tarefas",
      "Isso removerá todas as suas tarefas criadas. Continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: onExcluirTarefas }
      ]
    );
  };

  const confirmarResetTotal = () => {
    Alert.alert(
      "RESTAURAÇÃO DE FÁBRICA",
      "ATENÇÃO: Isso apagará seu XP, Grãos, Tarefas e Histórico. O app voltará ao estado original. Confirmar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "RESTAURAR TUDO", style: "destructive", onPress: onResetTotal }
      ]
    );
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Configurações</Text>
          <TouchableOpacity onPress={fechar}>
            <Ionicons name="close" size={32} color={COLORS.textoEscuro} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionLabel}>APRENDIZADO</Text>
          <TouchableOpacity style={styles.btnAbout} onPress={() => setModalAboutVisivel(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconCircle}>
                <Ionicons name="book-outline" size={20} color={COLORS.foco} />
              </View>
              <Text style={styles.btnAboutText}>O que é a Técnica Pomodoro?</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textoEscuro} opacity={0.3} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>TEMPOS PADRÃO (MINUTOS)</Text>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.miniLabel}>Foco</Text>
              <TextInput style={styles.input} value={foco} onChangeText={setFoco} keyboardType="numeric" maxLength={3} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.miniLabel}>Curto</Text>
              <TextInput style={styles.input} value={curto} onChangeText={setCurto} keyboardType="numeric" maxLength={3} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.miniLabel}>Longo</Text>
              <TextInput style={styles.input} value={longo} onChangeText={setLongo} keyboardType="numeric" maxLength={3} />
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>PREFERÊNCIAS</Text>
          <TouchableOpacity 
            style={[styles.soundButton, !som && { opacity: 0.7 }]} 
            onPress={() => setSom(!som)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={som ? "volume-high" : "volume-mute"} size={24} color={som ? COLORS.foco : COLORS.textoEscuro} />
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.soundTitle}>Efeitos Sonoros</Text>
                <Text style={[styles.soundStatus, { color: som ? COLORS.foco : '#999' }]}>
                  {som ? 'Ativados' : 'Desativados'}
                </Text>
              </View>
            </View>
            <View style={[styles.toggle, som ? styles.toggleOn : styles.toggleOff]}>
                <View style={styles.toggleCircle} />
            </View>
          </TouchableOpacity>

          {/* SEÇÃO: ZONA DE PERIGO ATUALIZADA */}
          <View style={styles.dangerZone}>
            <Text style={styles.dangerTitle}>ZONA DE PERIGO</Text>
            
            <View style={styles.dangerRow}>
              <TouchableOpacity style={styles.btnDangerSmall} onPress={confirmarExclusaoHistorico}>
                <Ionicons name="calendar-outline" size={18} color="#e74c3c" />
                <Text style={styles.textExcluir}>HISTÓRICO</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnDangerSmall} onPress={confirmarExclusaoTarefas}>
                <Ionicons name="list-outline" size={18} color="#e74c3c" />
                <Text style={styles.textExcluir}>TAREFAS</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnResetTotal} onPress={confirmarResetTotal}>
              <Ionicons name="refresh-circle-outline" size={22} color="#fff" />
              <Text style={styles.textReset}>RESTAURAR DEFINIÇÕES DE FÁBRICA</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
            <Text style={styles.btnTexto}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>
        </ScrollView>

        <AboutModal 
          visivel={modalAboutVisivel} 
          fechar={() => setModalAboutVisivel(false)} 
        />
      </SafeAreaView>
    </Modal>
  );
};

// ... Mantenha seus estilos iguais ao que você enviou ...

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.branco },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  tituloHeader: { fontFamily: FONTS.logo, fontSize: 28, color: COLORS.textoEscuro },
  scrollContent: { padding: 25 },
  sectionLabel: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textoEscuro, opacity: 0.5, marginBottom: 15, marginTop: 10, letterSpacing: 1 },
  
  // Botão About
  btnAbout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: 15, borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
  iconCircle: { backgroundColor: '#fff', padding: 8, borderRadius: 12, elevation: 1 },
  btnAboutText: { fontFamily: FONTS.mono, fontSize: 14, fontWeight: 'bold', color: COLORS.textoEscuro, marginLeft: 12 },
  
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 25 },
  
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputGroup: { width: '30%' },
  miniLabel: { fontFamily: FONTS.mono, fontSize: 12, textAlign: 'center', marginBottom: 8 },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 15, textAlign: 'center', fontFamily: FONTS.mono, fontSize: 16, color: COLORS.textoEscuro },
  
  // Som Premium
  soundButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fcfcfc', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
  soundTitle: { fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold', color: COLORS.textoEscuro },
  soundStatus: { fontFamily: FONTS.mono, fontSize: 12, marginTop: 2 },
  toggle: { width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: COLORS.foco, alignItems: 'flex-end' },
  toggleOff: { backgroundColor: '#ccc', alignItems: 'flex-start' },
  toggleCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },

  // Zona de Perigo
  dangerZone: { marginTop: 40, paddingTop: 30, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  dangerTitle: { fontFamily: FONTS.mono, fontSize: 12, color: '#e74c3c', marginBottom: 15, fontWeight: 'bold' },
  dangerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  btnDangerSmall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#e74c3c', backgroundColor: '#fff5f5', width: '48%' },
  textExcluir: { color: '#e74c3c', fontFamily: FONTS.mono, fontSize: 10, fontWeight: 'bold', marginLeft: 8 },
  btnResetTotal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 15, backgroundColor: '#e74c3c', marginTop: 5 },
  textReset: { color: '#fff', fontFamily: FONTS.mono, fontSize: 11, fontWeight: 'bold', marginLeft: 10 },

  btnSalvar: { backgroundColor: COLORS.textoEscuro, padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 40, marginBottom: 40 },
  btnTexto: { color: '#fff', fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold' },
});