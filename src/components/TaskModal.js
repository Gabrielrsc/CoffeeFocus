import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const TaskModal = ({ visivel, fechar, salvar, tarefaParaEditar }) => {
  const [titulo, setTitulo] = useState('');
  const [estimativa, setEstimativa] = useState('1');
  const [tempoFoco, setTempoFoco] = useState('25');
  const [tempoPausa, setTempoPausa] = useState('5');

  // Sincroniza os campos quando o modal abre (para criar ou editar)
  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo);
      setEstimativa(tarefaParaEditar.focosEstimados.toString());
      setTempoFoco((tarefaParaEditar.tempoFoco / 60).toString());
      setTempoPausa((tarefaParaEditar.tempoPausa / 60).toString());
    } else {
      // Reset para nova tarefa
      setTitulo('');
      setEstimativa('1');
      setTempoFoco('25');
      setTempoPausa('5');
    }
  }, [tarefaParaEditar, visivel]);

  const handleConfirmar = () => {
    if (!titulo.trim()) return;

    salvar({
      titulo,
      focosEstimados: parseInt(estimativa) || 1,
      tempoFoco: (parseInt(tempoFoco) || 25) * 60, // converte min para seg
      tempoPausa: (parseInt(tempoPausa) || 5) * 60, // converte min para seg
    });
    fechar();
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent={true} onRequestClose={fechar}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.tituloHeader}>
              {tarefaParaEditar ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Text>
            <TouchableOpacity onPress={fechar}>
              <Ionicons name="close" size={28} color={COLORS.textoEscuro} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>O QUE VAIS FAZER?</Text>
            <TextInput 
              style={styles.input} 
              value={titulo} 
              onChangeText={setTitulo} 
              placeholder="Ex: Estudar React Native"
              autoFocus={!tarefaParaEditar}
            />

            <Text style={styles.label}>ESTIMATIVA (QUANTOS FOCOS?)</Text>
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, { flex: 1 }]} 
                value={estimativa} 
                onChangeText={setEstimativa} 
                keyboardType="numeric" 
                maxLength={2}
              />
              <Ionicons name="cafe" size={24} color={COLORS.foco} style={{ marginLeft: 10 }} />
            </View>

            {/* CONFIGURAÇÃO DE TEMPO POR TAREFA */}
            <View style={styles.rowTempos}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>FOCO (MIN)</Text>
                <TextInput 
                  style={styles.input} 
                  value={tempoFoco} 
                  onChangeText={setTempoFoco} 
                  keyboardType="numeric" 
                  maxLength={3}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.label}>PAUSA (MIN)</Text>
                <TextInput 
                  style={styles.input} 
                  value={tempoPausa} 
                  onChangeText={setTempoPausa} 
                  keyboardType="numeric" 
                  maxLength={3}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.btnSalvar} onPress={handleConfirmar}>
              <Text style={styles.btnTexto}>
                {tarefaParaEditar ? 'SALVAR ALTERAÇÕES' : 'CRIAR TAREFA'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    padding: 20 
  },
  container: { 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    padding: 25,
    maxHeight: '80%' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  tituloHeader: { 
    fontFamily: FONTS.logo, 
    fontSize: 22, 
    color: COLORS.textoEscuro 
  },
  label: { 
    fontFamily: FONTS.mono, 
    fontSize: 10, 
    opacity: 0.6, 
    marginBottom: 8, 
    marginTop: 15,
    letterSpacing: 1
  },
  input: { 
    backgroundColor: '#f5f5f5', 
    padding: 15, 
    borderRadius: 12, 
    fontFamily: FONTS.mono, 
    fontSize: 16,
    color: COLORS.textoEscuro
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rowTempos: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 5
  },
  btnSalvar: { 
    backgroundColor: COLORS.textoEscuro, 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 30,
    marginBottom: 10
  },
  btnTexto: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontFamily: FONTS.mono,
    fontSize: 14
  }
});