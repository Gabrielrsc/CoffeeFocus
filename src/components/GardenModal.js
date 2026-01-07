import React, { useEffect, useRef } from 'react';
import {SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Image, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

export const GardenModal = ({ visivel, fechar, xp, graos, onColher }) => {
  const animacaoEscala = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visivel) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animacaoEscala, {
            toValue: 1.08,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(animacaoEscala, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [visivel]);

  const getEvolucaoInfo = () => {
    if (xp < 25) return { stage: "Semente", img: require('../../assets/garden/semente.png'), color: "#8d6e63", desc: "Plante foco e colha resultados." };
    if (xp < 50) return { stage: "Broto", img: require('../../assets/garden/broto.png'), color: "#aed581", desc: "A sua disciplina está a dar vida à planta." };
    if (xp < 75) return { stage: "Crescimento", img: require('../../assets/garden/arbusto.png'), color: "#8bc34a", desc: "Quase lá! O cafeeiro está a ficar robusto." };
    return { stage: "Pronto para Colher", img: require('../../assets/garden/arvore.png'), color: "#4caf50", desc: "Excelente trabalho! Hora da colheita." };
  };

  const info = getEvolucaoInfo();
  const podeColher = xp >= 100;

  return (
    <Modal visible={visivel} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* HEADER COM TROFÉUS */}
        <View style={styles.header}>
          <View>
            <Text style={styles.tituloHeader}>Meu Jardim</Text>
            <View style={styles.badgeConquistas}>
              <Ionicons name="ribbon" size={14} color="#D4AF37" />
              <Text style={styles.txtConquistas}>{graos} COLHEITAS REALIZADAS</Text>
            </View>
          </View>
          <TouchableOpacity onPress={fechar}>
            <Ionicons name="close" size={32} color={COLORS.textoEscuro} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* VISUALIZAÇÃO DA PLANTA */}
          <View style={styles.plantContainer}>
            <View style={[styles.halo, { backgroundColor: info.color + '15' }]} />
            <Animated.Image 
              source={info.img}
              style={[styles.imagemPlanta, { transform: [{ scale: animacaoEscala }] }]}
              resizeMode="contain"
            />
            <Text style={[styles.stageLabel, { color: info.color }]}>{info.stage.toUpperCase()}</Text>
          </View>

          {/* STATUS DE XP COM MARCADORES */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>NÍVEL DE EXPERIÊNCIA</Text>
              <Text style={styles.xpText}>{xp} XP <Text style={{opacity: 0.3}}>/ 100</Text></Text>
            </View>
            
            <View style={styles.barWrapper}>
              <View style={styles.barBg}>
                <View style={[styles.barActive, { width: `${xp}%`, backgroundColor: info.color }]} />
              </View>
              
              {/* Marcadores de Evolução */}
              <View style={[styles.marker, { left: '25%' }, xp >= 25 && { backgroundColor: info.color, borderColor: '#fff' }]} />
              <View style={[styles.marker, { left: '50%' }, xp >= 50 && { backgroundColor: info.color, borderColor: '#fff' }]} />
              <View style={[styles.marker, { left: '75%' }, xp >= 75 && { backgroundColor: info.color, borderColor: '#fff' }]} />
            </View>
            
            <View style={styles.markerLabels}>
              <Text style={[styles.mLabel, xp >= 25 && { color: info.color, opacity: 1 }]}>25xp</Text>
              <Text style={[styles.mLabel, xp >= 50 && { color: info.color, opacity: 1 }]}>50xp</Text>
              <Text style={[styles.mLabel, xp >= 75 && { color: info.color, opacity: 1 }]}>75xp</Text>
            </View>

            <Text style={styles.descriptionText}>{info.desc}</Text>
          </View>

          {/* BOTÃO DE COLHEITA */}
          <TouchableOpacity 
            style={[styles.btnAction, podeColher ? styles.btnPronto : styles.btnTrabalhando]} 
            onPress={podeColher ? onColher : null}
            activeOpacity={podeColher ? 0.7 : 1}
          >
            <Ionicons name={podeColher ? "sparkles" : "leaf-outline"} size={22} color="#fff" />
            <Text style={styles.btnActionText}>
              {podeColher ? "REALIZAR COLHEITA" : "FOQUE PARA EVOLUIR"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.branco },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderColor: '#f2f2f2' },
  tituloHeader: { fontFamily: FONTS.logo, fontSize: 24, color: COLORS.textoEscuro },
  badgeConquistas: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fdf6e3', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 5 },
  txtConquistas: { fontFamily: FONTS.mono, fontSize: 10, color: '#b8860b', fontWeight: 'bold', marginLeft: 6 },
  content: { flex: 1, padding: 25, alignItems: 'center', justifyContent: 'center' },
  
  plantContainer: { alignItems: 'center', justifyContent: 'center', height: 280, width: '100%' },
  halo: { position: 'absolute', width: 180, height: 180, borderRadius: 90 },
  imagemPlanta: { width: 200, height: 200 },
  stageLabel: { fontFamily: FONTS.mono, fontSize: 18, fontWeight: 'bold', marginTop: 15, letterSpacing: 1 },

  statusCard: { backgroundColor: '#f9f9f9', width: '100%', padding: 25, borderRadius: 30, borderWidth: 1, borderColor: '#f0f0f0' },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  statusTitle: { fontFamily: FONTS.mono, fontSize: 11, opacity: 0.4, fontWeight: 'bold' },
  xpText: { fontFamily: FONTS.mono, fontSize: 15, fontWeight: 'bold', color: COLORS.textoEscuro },
  
  barWrapper: { height: 20, width: '100%', justifyContent: 'center' },
  barBg: { height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden' },
  barActive: { height: '100%', borderRadius: 5 },
  marker: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', borderWidth: 2, borderColor: '#e0e0e0', zIndex: 10 },
  
  markerLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  mLabel: { fontFamily: FONTS.mono, fontSize: 9, opacity: 0.3, width: 40, textAlign: 'center' },
  
  descriptionText: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textoEscuro, textAlign: 'center', marginTop: 25, lineHeight: 18, opacity: 0.6 },

  btnAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 22, marginTop: 40, width: '100%' },
  btnPronto: { backgroundColor: '#4caf50', elevation: 4 },
  btnTrabalhando: { backgroundColor: '#d0d0d0' },
  btnActionText: { color: '#fff', fontFamily: FONTS.mono, fontWeight: 'bold', fontSize: 15, marginLeft: 10 }
});