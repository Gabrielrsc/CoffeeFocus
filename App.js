import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, Alert, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilos e Componentes
import { CONFIGS, COLORS, FONTS } from './src/styles/theme';
import { Header } from './src/components/Header';
import { TimerDisplay } from './src/components/TimerDisplay';
import { ModeSelector } from './src/components/ModeSelector';
import { SettingsModal } from './src/components/SettingsModal';
import { HistoryModal } from './src/components/HistoryModal';
import { TaskModal } from './src/components/TaskModal';
import { TaskInput } from './src/components/TaskInput';
import { TaskItem } from './src/components/TaskItem';

// Hooks
import { useAppResources } from './src/hooks/useAppResources';
import { useSound } from './src/hooks/useSound';

export default function App() {
  const { fontsLoaded } = useAppResources();
  const { playSound } = useSound();

  const [estaRodando, setEstaRodando] = useState(false);
  const [contexto, setContexto] = useState('foco');
  const [sessaoNoCiclo, setSessaoNoCiclo] = useState(1);
  const [modalConfigAberto, setModalConfigAberto] = useState(false);
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);
  const [modalTaskAberto, setModalTaskAberto] = useState(false);

  const [somHabilitado, setSomHabilitado] = useState(true);
  const [historico, setHistorico] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaAtiva, setTarefaAtiva] = useState(null);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);
  const [temposGlobais, setTemposGlobais] = useState({ foco: 1500, curto: 300, longo: 900 });
  const [tempoSegundos, setTempoSegundos] = useState(1500);

  const totalSessoesObjetivo = tarefaAtiva ? tarefaAtiva.focosEstimados : 4;

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [config, hist, task] = await Promise.all([
        AsyncStorage.getItem('@CoffeeFocus:config'),
        AsyncStorage.getItem('@CoffeeFocus:historico'),
        AsyncStorage.getItem('@CoffeeFocus:tarefas')
      ]);
      if (config) {
        const d = JSON.parse(config);
        setTemposGlobais(d.tempos);
        setSomHabilitado(d.somHabilitado);
        setTempoSegundos(d.tempos.foco);
      }
      if (hist) setHistorico(JSON.parse(hist));
      if (task) setTarefas(JSON.parse(task));
    } catch (e) { console.error(e); }
  };

  const obterTempoDoModo = (modo) => {
    if (tarefaAtiva) {
      if (modo === 'foco') return tarefaAtiva.tempoFoco;
      if (modo === 'curto') return tarefaAtiva.tempoPausa;
    }
    return temposGlobais[modo];
  };

  const selecionarTarefa = (task) => {
    const novaTask = tarefaAtiva?.id === task.id ? null : task;
    setTarefaAtiva(novaTask);
    setEstaRodando(false);
    setSessaoNoCiclo(1);
    setTempoSegundos(novaTask ? (contexto === 'foco' ? novaTask.tempoFoco : novaTask.tempoPausa) : temposGlobais[contexto]);
  };

  const resetTotalApp = () => {
    Alert.alert("Reset Total", "Deseja apagar tudo e voltar aos padrões de fábrica?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Resetar", style: "destructive", onPress: async () => {
        const padrao = { foco: 1500, curto: 300, longo: 900 };
        setTemposGlobais(padrao);
        setTempoSegundos(padrao.foco);
        setContexto('foco');
        setTarefas([]);
        setTarefaAtiva(null);
        setHistorico([]);
        setSomHabilitado(true);
        await AsyncStorage.clear();
        setModalConfigAberto(false);
        Alert.alert("Sucesso", "App restaurado.");
      }}
    ]);
  };

  const registrarFimDeFoco = async () => {
    const agora = new Date();
    const novaSessao = {
      id: Math.random().toString(36).substr(2, 9),
      data: agora.toISOString().split('T')[0],
      hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      duracao: Math.floor((tarefaAtiva ? tarefaAtiva.tempoFoco : temposGlobais.foco) / 60),
      tarefa: tarefaAtiva ? tarefaAtiva.titulo : "Foco Livre"
    };
    const novoHist = [novaSessao, ...historico];
    setHistorico(novoHist);
    await AsyncStorage.setItem('@CoffeeFocus:historico', JSON.stringify(novoHist));

    if (tarefaAtiva) {
      const lista = tarefas.map(t => t.id === tarefaAtiva.id ? { ...t, focosRealizados: t.focosRealizados + 1 } : t);
      setTarefas(lista);
      setTarefaAtiva(lista.find(t => t.id === tarefaAtiva.id));
      await AsyncStorage.setItem('@CoffeeFocus:tarefas', JSON.stringify(lista));
    }
  };

  useEffect(() => {
    let intervalo = null;
    if (estaRodando && tempoSegundos > 0) {
      intervalo = setInterval(() => setTempoSegundos(t => t - 1), 1000);
    } else if (tempoSegundos === 0) {
      setEstaRodando(false);
      playSound('alarm', somHabilitado);
      if (contexto === 'foco') {
        registrarFimDeFoco();
        if (sessaoNoCiclo < totalSessoesObjetivo) {
          setContexto('curto'); setTempoSegundos(obterTempoDoModo('curto')); setSessaoNoCiclo(s => s + 1);
        } else {
          setContexto('longo'); setTempoSegundos(obterTempoDoModo('longo')); setSessaoNoCiclo(1);
        }
      } else { setContexto('foco'); setTempoSegundos(obterTempoDoModo('foco')); }
    }
    return () => clearInterval(intervalo);
  }, [estaRodando, tempoSegundos, contexto, sessaoNoCiclo, tarefaAtiva, somHabilitado]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: CONFIGS[contexto].cor }]}>
        <StatusBar style="light" />
        <Header focosConcluidos={historico.length} abrirHistorico={() => setModalHistoricoAberto(true)} abrirConfig={() => setModalConfigAberto(true)} />
        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={styles.topContent}>
              <View style={styles.card}>
                <ModeSelector contexto={contexto} mudarModo={(m) => { setEstaRodando(false); setContexto(m); setTempoSegundos(obterTempoDoModo(m)); }} />
                {tarefaAtiva && (
                  <View style={styles.badgeTarefaCard}>
                    <Ionicons name="cafe" size={14} color={COLORS.foco} />
                    <Text style={styles.textoTarefaCard} numberOfLines={1}>{tarefaAtiva.titulo}</Text>
                  </View>
                )}
                <Text style={styles.textoCiclo}>SESSÃO {sessaoNoCiclo} DE {totalSessoesObjetivo}</Text>
                <TimerDisplay segundos={tempoSegundos} />
                <TouchableOpacity style={styles.botaoAction} onPress={() => { playSound('click', somHabilitado); setEstaRodando(!estaRodando); }}>
                  <Ionicons name={estaRodando ? "pause" : "play"} size={24} color={COLORS.branco} />
                  <Text style={styles.botaoTexto}>{estaRodando ? 'PAUSAR' : 'INICIAR'}</Text>
                </TouchableOpacity>
              </View>
              <TaskInput onPress={() => { setTarefaParaEditar(null); setModalTaskAberto(true); }} />
              <Text style={styles.sectionTitle}>{tarefaAtiva ? "TAREFA SELECIONADA" : "LISTA DE TAREFAS"}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TaskItem item={item} isAtiva={tarefaAtiva?.id === item.id} selecionar={selecionarTarefa} editar={(t) => { setTarefaParaEditar(t); setModalTaskAberto(true); }} excluir={(id) => { const l = tarefas.filter(x => x.id !== id); setTarefas(l); if(tarefaAtiva?.id === id) setTarefaAtiva(null); AsyncStorage.setItem('@CoffeeFocus:tarefas', JSON.stringify(l)); }} />
          )}
          contentContainerStyle={styles.scrollPadding}
        />
        <TaskModal visivel={modalTaskAberto} fechar={() => setModalTaskAberto(false)} salvar={async (d) => {
          let nl; if(tarefaParaEditar) { nl = tarefas.map(t => t.id === tarefaParaEditar.id ? {...t, ...d} : t); if(tarefaAtiva?.id === tarefaParaEditar.id) setTarefaAtiva({...tarefaAtiva, ...d}); }
          else { nl = [...tarefas, {id: Date.now().toString(), ...d, focosRealizados: 0}]; }
          setTarefas(nl); await AsyncStorage.setItem('@CoffeeFocus:tarefas', JSON.stringify(nl));
        }} tarefaParaEditar={tarefaParaEditar} />
        <HistoryModal visivel={modalHistoricoAberto} fechar={() => setModalHistoricoAberto(false)} historicoCompleto={historico} />
        <SettingsModal visivel={modalConfigAberto} fechar={() => setModalConfigAberto(false)} temposAtuais={temposGlobais} somAtivo={somHabilitado} onExcluirHistorico={() => { setHistorico([]); AsyncStorage.removeItem('@CoffeeFocus:historico'); }} onExcluirTarefas={() => { setTarefas([]); setTarefaAtiva(null); AsyncStorage.removeItem('@CoffeeFocus:tarefas'); }} onResetTotal={resetTotalApp} salvar={async (d) => {
          setTemposGlobais(d.tempos); setSomHabilitado(d.somHabilitado); if(!tarefaAtiva) setTempoSegundos(d.tempos[contexto]); setModalConfigAberto(false); await AsyncStorage.setItem('@CoffeeFocus:config', JSON.stringify(d));
        }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, topContent: { alignItems: 'center' }, scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: COLORS.card, width: '100%', padding: 30, borderRadius: 30, alignItems: 'center', elevation: 8, marginTop: 20 },
  badgeTarefaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginBottom: 10, marginTop: 5 },
  textoTarefaCard: { fontFamily: FONTS.mono, fontSize: 12, fontWeight: 'bold', color: COLORS.textoEscuro, marginLeft: 6 },
  textoCiclo: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textoEscuro, opacity: 0.4, marginBottom: 5, letterSpacing: 1 },
  botaoAction: { backgroundColor: COLORS.textoEscuro, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 100, marginTop: 30, flexDirection: 'row', alignItems: 'center' },
  botaoTexto: { color: COLORS.branco, fontWeight: 'bold', fontSize: 18, fontFamily: FONTS.mono, marginLeft: 10 },
  sectionTitle: { alignSelf: 'flex-start', fontFamily: FONTS.mono, fontSize: 12, color: COLORS.branco, opacity: 0.8, marginBottom: 10, marginTop: 20 },
});