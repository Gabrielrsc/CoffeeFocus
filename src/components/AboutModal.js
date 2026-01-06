import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const AboutModal = ({ visivel, fechar }) => {
  return (
    <Modal visible={visivel} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>A Técnica</Text>
          <TouchableOpacity onPress={fechar}>
            <Ionicons name="close" size={32} color={COLORS.textoEscuro} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* ICONE E TÍTULO PRINCIPAL */}
          <View style={styles.heroSection}>
            <View style={styles.iconCircle}>
              <Ionicons name="timer-outline" size={50} color={COLORS.foco} />
            </View>
            <Text style={styles.mainTitle}>O que é o Pomodoro?</Text>
            <Text style={styles.description}>
              Criada por Francesco Cirillo, a técnica utiliza um cronômetro para dividir o trabalho em períodos de foco intenso, melhorando a agilidade mental e evitando distrações.
            </Text>
          </View>

          {/* PASSOS DA TÉCNICA */}
          <Text style={styles.sectionLabel}>PASSO A PASSO</Text>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Escolha uma Tarefa</Text>
              <Text style={styles.stepText}>Defina o que precisa de ser feito agora.</Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Foco Total</Text>
              <Text style={styles.stepText}>Trabalhe durante 25 minutos sem interrupções.</Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Pausa Curta</Text>
              <Text style={styles.stepText}>Relaxe por 5 minutos após cada sessão.</Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Pausa Longa</Text>
              <Text style={styles.stepText}>A cada 4 sessões, descanse de 15 a 30 minutos.</Text>
            </View>
          </View>

          {/* DICA FINAL */}
          <View style={styles.tipBox}>
            <Ionicons name="bulb-outline" size={20} color={COLORS.foco} />
            <Text style={styles.tipText}>
              Evite o cansaço mental respeitando as pausas, mesmo que sinta que pode continuar.
            </Text>
          </View>

          {/* BOTÃO FECHAR */}
          <TouchableOpacity style={styles.btnEntendi} onPress={fechar}>
            <Text style={styles.btnTexto}>VAMOS COMEÇAR!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.branco },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  tituloHeader: { fontFamily: FONTS.logo, fontSize: 24, color: COLORS.textoEscuro },
  content: { padding: 25 },
  
  heroSection: { alignItems: 'center', marginBottom: 30 },
  iconCircle: { 
    backgroundColor: '#fff5f0', 
    padding: 20, 
    borderRadius: 35, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffe8db'
  },
  mainTitle: { 
    fontFamily: FONTS.mono, 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: COLORS.textoEscuro, 
    textAlign: 'center', 
    marginBottom: 12 
  },
  description: { 
    fontFamily: FONTS.mono, 
    fontSize: 14, 
    color: COLORS.textoEscuro, 
    textAlign: 'center', 
    lineHeight: 22, 
    opacity: 0.7 
  },

  sectionLabel: { 
    fontFamily: FONTS.mono, 
    fontSize: 12, 
    color: COLORS.foco, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    letterSpacing: 1 
  },

  stepCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  stepNumberContainer: { 
    backgroundColor: COLORS.foco, 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15
  },
  stepNumber: { color: '#fff', fontWeight: 'bold', fontFamily: FONTS.mono },
  stepInfo: { flex: 1 },
  stepTitle: { fontFamily: FONTS.mono, fontSize: 14, fontWeight: 'bold', color: COLORS.textoEscuro },
  stepText: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textoEscuro, opacity: 0.6, marginTop: 2 },

  tipBox: { 
    flexDirection: 'row', 
    backgroundColor: '#f0f4f8', 
    padding: 15, 
    borderRadius: 15, 
    marginTop: 20,
    alignItems: 'center'
  },
  tipText: { 
    fontFamily: FONTS.mono, 
    fontSize: 12, 
    color: COLORS.textoEscuro, 
    flex: 1, 
    marginLeft: 10,
    fontStyle: 'italic'
  },

  btnEntendi: { 
    backgroundColor: COLORS.textoEscuro, 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 40,
    marginBottom: 20
  },
  btnTexto: { color: '#fff', fontFamily: FONTS.mono, fontSize: 16, fontWeight: 'bold' },
});