import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text, 
  Alert, 
  FlatList 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilos e Temas
import { CONFIGS, COLORS, FONTS } from './src/styles/theme';

// Componentes
import { Header } from './src/components/Header';
import { TimerDisplay } from './src/components/TimerDisplay';
import { ModeSelector } from './src/components/ModeSelector';
import { SettingsModal } from './src/components/SettingsModal';
import { HistoryModal } from './src/components/HistoryModal';
import { TaskModal } from './src/components/TaskModal';
import { TaskInput } from './src/components/TaskInput';
import { TaskItem } from './src/components/TaskItem';
import { CoffeeGarden } from './src/components/CoffeeGarden';
import { GardenModal } from './src/components/GardenModal';
import { CustomSplashScreen } from './src/components/CustomSplashScreen';

// Hooks
import { useAppResources } from './src/hooks/useAppResources';
import { useSound } from './src/hooks/useSound';

export default function App() {
  const { fontsLoaded } = useAppResources();
  const { playSound } = useSound();

  // --- ESTADOS DE CONTROLE ---
  const [splashPronta, setSplashPronta] = useState(false);
  const [estaRodando, setEstaRodando] = useState(false);
  const [contexto, setContexto] = useState('foco');
  const [sessaoNoCiclo, setSessaoNoCiclo] = useState(1);
  
  // Modais
  const [modalConfigAberto, setModalConfigAberto] = useState(false);
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);
  const [modalTaskAberto, setModalTaskAberto] = useState(false);
  const [modalGardenAberto, setModalGardenAberto] = useState(false);

  // --- DADOS (XP E PERSISTÊNCIA) ---
  const [plantaXP, setPlantaXP] = useState(0);
  const [graosColhidos, setGraosColhidos] = useState(0);
  const [somHabilitado, setSomHabilitado] = useState(true);
  const [historico, setHistorico] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaAtiva, setTarefaAtiva] = useState(null);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);
  const [temposGlobais, setTemposGlobais] = useState({ foco: 1500, curto: 300, longo: 900 });
  const [tempoSegundos, setTempoSegundos] = useState(1500);

  const totalSessoesObjetivo = tarefaAtiva ? tarefaAtiva.focosEstimados : 4;

  // --- CARREGAMENTO ---
  const carregarDados = async () => {
    try {
      const [config, hist, task, xp, graos] = await Promise.all([
        AsyncStorage.getItem('@CoffeeFocus:config'),
        AsyncStorage.getItem('@CoffeeFocus:historico'),
        AsyncStorage.getItem('@CoffeeFocus:tarefas'),
        AsyncStorage.getItem('@CoffeeFocus:plantaXP'),
        AsyncStorage.getItem('@CoffeeFocus:graosColhidos')
      ]);
      
      if (config) {
        const d = JSON.parse(config);
        setTemposGlobais(d.tempos);
        setSomHabilitado(d.somHabilitado);
        setTempoSegundos(d.tempos[contexto]);
      }
      if (hist) setHistorico(JSON.parse(hist));
      if (task) setTarefas(JSON.parse(task));
      if (xp) setPlantaXP(parseInt(xp) || 0);
      if (graos) setGraosColhidos(parseInt(graos) || 0);
    } catch (e) { console.error("Erro no load:", e); }
  };

  useEffect(() => { carregarDados(); }, []);

  // --- SISTEMA DE XP E COLHEITA ---
  const atualizarXP = async (valor) => {
    setPlantaXP(prev => {
      const novoXP = Math.max(0, Math.min(100, prev + valor));
      AsyncStorage.setItem('@CoffeeFocus:plantaXP', novoXP.toString());
      return novoXP;
    });
  };

  const handleColheita = async () => {
    const novosGraos = graosColhidos + 1;
    setGraosColhidos(novosGraos);
    setPlantaXP(0);
    playSound('success', somHabilitado);
    await AsyncStorage.setItem('@CoffeeFocus:graosColhidos', novosGraos.toString());
    await AsyncStorage.setItem('@CoffeeFocus:plantaXP', '0');
    setModalGardenAberto(false);
    Alert.alert("☕ Colheita Realizada!", "Incrível! Você colheu um café especial.");
  };

  // --- GESTÃO DE TAREFAS ---
  const selecionarTarefa = (task) => {
    const novaTask = tarefaAtiva?.id === task.id ? null : task;
    setTarefaAtiva(novaTask);
    setEstaRodando(false);
    setSessaoNoCiclo(1);
    setTempoSegundos(novaTask ? (contexto === 'foco' ? novaTask.tempoFoco : novaTask.tempoPausa) : temposGlobais[contexto]);
  };

  const excluirTarefa = (id) => {
    Alert.alert("Excluir", "Deseja remover esta tarefa?", [
      { text: "Não" },
      { text: "Sim", style: "destructive", onPress: async () => {
          const novaLista = tarefas.filter(t => t.id !== id);
          if (tarefaAtiva?.id === id) setTarefaAtiva(null);
          setTarefas(novaLista);
          await AsyncStorage.setItem('@CoffeeFocus:tarefas', JSON.stringify(novaLista));
      }}
    ]);
  };

  const handleSalvarTask = async (dados) => {
    let novaLista;
    if (tarefaParaEditar) {
      novaLista = tarefas.map(t => t.id === tarefaParaEditar.id ? { ...t, ...dados } : t);
    } else {
      novaLista = [...tarefas, { id: Date.now().toString(), ...dados, focosRealizados: 0 }];
    }
    setTarefas(novaLista);
    await AsyncStorage.setItem('@CoffeeFocus:tarefas', JSON.stringify(novaLista));
    setModalTaskAberto(false);
  };

  // --- TIMER ---
  const handleToggleTimer = () => {
    playSound('click', somHabilitado);
    if (estaRodando && contexto === 'foco') {
      Alert.alert("Parar?", "Sua planta perderá 15 XP!", [
        { text: "Voltar" },
        { text: "Parar", style: "destructive", onPress: () => {
            setEstaRodando(false);
            atualizarXP(-15);
            setTempoSegundos(tarefaAtiva ? tarefaAtiva.tempoFoco : temposGlobais.foco);
        }}
      ]);
    } else { setEstaRodando(!estaRodando); }
  };

  useEffect(() => {
    let intervalo = null;
    if (estaRodando && tempoSegundos > 0) {
      intervalo = setInterval(() => setTempoSegundos(t => t - 1), 1000);
    } else if (tempoSegundos === 0) {
      setEstaRodando(false);
      playSound('alarm', somHabilitado);
      if (contexto === 'foco') {
        atualizarXP(10);
        if (sessaoNoCiclo < totalSessoesObjetivo) {
          setContexto('curto'); setTempoSegundos(temposGlobais.curto); setSessaoNoCiclo(s => s + 1);
        } else {
          setContexto('longo'); setTempoSegundos(temposGlobais.longo); setSessaoNoCiclo(1);
        }
      } else {
        setContexto('foco'); setTempoSegundos(temposGlobais.foco);
      }
    }
    return () => clearInterval(intervalo);
  }, [estaRodando, tempoSegundos]);

  if (!fontsLoaded || !splashPronta) {
    return <CustomSplashScreen onFinish={() => setSplashPronta(true)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: CONFIGS[contexto].cor }]} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <Header focosConcluidos={historico.length} abrirHistorico={() => setModalHistoricoAberto(true)} abrirConfig={() => setModalConfigAberto(true)} />
        
        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={styles.topContent}>
              <CoffeeGarden xp={plantaXP} onPress={() => setModalGardenAberto(true)} />

              <View style={styles.card}>
                <ModeSelector contexto={contexto} mudarModo={(m) => { setEstaRodando(false); setContexto(m); setTempoSegundos(temposGlobais[m]); }} />
                <Text style={styles.textoCiclo}>SESSÃO {sessaoNoCiclo} DE {totalSessoesObjetivo}</Text>
                <TimerDisplay segundos={tempoSegundos} />
                <TouchableOpacity style={styles.botaoAction} onPress={handleToggleTimer}>
                  <Ionicons name={estaRodando ? "pause" : "play"} size={24} color="#fff" />
                  <Text style={styles.botaoTexto}>{estaRodando ? 'PAUSAR' : 'INICIAR'}</Text>
                </TouchableOpacity>
              </View>

              <TaskInput onPress={() => { setTarefaParaEditar(null); setModalTaskAberto(true); }} />
              <Text style={styles.sectionTitle}>{tarefaAtiva ? "TAREFA ATIVA" : "LISTA DE TAREFAS"}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TaskItem 
              item={item} 
              isAtiva={tarefaAtiva?.id === item.id} 
              selecionar={selecionarTarefa} 
              editar={() => { setTarefaParaEditar(item); setModalTaskAberto(true); }}
              excluir={() => excluirTarefa(item.id)}
            />
          )}
          contentContainerStyle={styles.scrollPadding}
        />

        <GardenModal visivel={modalGardenAberto} fechar={() => setModalGardenAberto(false)} xp={plantaXP} graos={graosColhidos} onColher={handleColheita} />
        
        <TaskModal visivel={modalTaskAberto} fechar={() => setModalTaskAberto(false)} salvar={handleSalvarTask} tarefaParaEditar={tarefaParaEditar} />
        
        <HistoryModal visivel={modalHistoricoAberto} fechar={() => setModalHistoricoAberto(false)} historicoCompleto={historico} />
        
        {/* --- SETTINGS MODAL COM ZONA DE PERIGO CONFIGURADA --- */}
        <SettingsModal 
          visivel={modalConfigAberto} 
          fechar={() => setModalConfigAberto(false)} 
          temposAtuais={temposGlobais} 
          somAtivo={somHabilitado}
          onExcluirHistorico={async () => {
            setHistorico([]);
            await AsyncStorage.removeItem('@CoffeeFocus:historico');
          }}
          onExcluirTarefas={async () => {
            setTarefas([]);
            setTarefaAtiva(null);
            await AsyncStorage.removeItem('@CoffeeFocus:tarefas');
          }}
          onResetTotal={async () => {
            await AsyncStorage.clear();
            setPlantaXP(0);
            setGraosColhidos(0);
            setHistorico([]);
            setTarefas([]);
            setTarefaAtiva(null);
            setModalConfigAberto(false);
            carregarDados(); // Recarrega os padrões
          }}
          salvar={async (d) => {
            setTemposGlobais(d.tempos);
            setSomHabilitado(d.somHabilitado);
            if(!tarefaAtiva) setTempoSegundos(d.tempos[contexto]);
            setModalConfigAberto(false);
            await AsyncStorage.setItem('@CoffeeFocus:config', JSON.stringify(d));
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContent: { alignItems: 'stretch', width: '100%' },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: COLORS.card, width: '100%', padding: 30, borderRadius: 30, alignItems: 'center', marginTop: 15, elevation: 5 },
  textoCiclo: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textoEscuro, opacity: 0.4, marginBottom: 5 },
  botaoAction: { backgroundColor: COLORS.textoEscuro, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 100, marginTop: 20, flexDirection: 'row', alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 18, fontFamily: FONTS.mono, marginLeft: 10 },
  sectionTitle: { alignSelf: 'flex-start', fontFamily: FONTS.mono, fontSize: 12, color: '#fff', opacity: 0.8, marginBottom: 10, marginTop: 20 },
});