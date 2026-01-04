import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export const HistoryModal = ({ visivel, fechar, historicoCompleto }) => {
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().toISOString().split('T')[0]);
  const [focosDoDia, setFocosDoDia] = useState([]);

  useEffect(() => {
    const filtrados = historicoCompleto.filter(item => item.data === diaSelecionado);
    setFocosDoDia(filtrados);
  }, [diaSelecionado, historicoCompleto]);

  const diasMarcados = historicoCompleto.reduce((acc, item) => {
    acc[item.data] = { marked: true, dotColor: COLORS.foco };
    if (item.data === diaSelecionado) {
      acc[item.data] = { ...acc[item.data], selected: true, selectedColor: COLORS.foco };
    }
    return acc;
  }, {});

  return (
    <Modal visible={visivel} animationType="slide" transparent={false} onRequestClose={fechar}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Histórico</Text>
          <TouchableOpacity onPress={fechar}>
            <Ionicons name="close" size={32} color={COLORS.textoEscuro} />
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={day => setDiaSelecionado(day.dateString)}
          markedDates={diasMarcados}
          theme={{
            todayTextColor: COLORS.foco,
            arrowColor: COLORS.foco,
            selectedDayBackgroundColor: COLORS.foco,
            fontFamily: FONTS.mono,
          }}
        />

        <View style={styles.listaContainer}>
          <Text style={styles.subtitulo}>Sessões de {diaSelecionado.split('-').reverse().join('/')}</Text>
          
          <FlatList
            data={focosDoDia}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemFoco}>
                <Ionicons name="cafe" size={20} color={COLORS.foco} />
                <View style={{ flex: 1 }}>
                  <View style={styles.row}>
                    <Text style={styles.horaFoco}>{item.hora}</Text>
                    <Text style={styles.duracaoFoco}>{item.duracao} min</Text>
                  </View>
                  {/* Exibe o nome da tarefa realizada */}
                  <Text style={styles.nomeTarefa} numberOfLines={1}>
                    {item.tarefa || "Foco Avulso"}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.vazio}>Sem registos neste dia.</Text>}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.branco },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#eee' },
  titulo: { fontFamily: FONTS.logo, fontSize: 28, color: COLORS.textoEscuro },
  listaContainer: { flex: 1, padding: 25 },
  subtitulo: { fontFamily: FONTS.mono, fontSize: 12, fontWeight: 'bold', marginBottom: 15, opacity: 0.5 },
  itemFoco: { flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 12, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  horaFoco: { fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold', color: COLORS.textoEscuro },
  duracaoFoco: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.foco },
  nomeTarefa: { fontFamily: FONTS.mono, fontSize: 13, color: COLORS.textoEscuro, marginTop: 2, fontWeight: 'bold', opacity: 0.8 },
  vazio: { textAlign: 'center', marginTop: 30, opacity: 0.4, fontFamily: FONTS.mono }
});