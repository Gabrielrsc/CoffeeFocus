import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export const CoffeeGarden = ({ xp, onPress }) => {
  // Lógica de evolução baseada em XP (0 a 100)
  const getStatusCrescimento = () => {
    if (xp < 25) {
      return { 
        fase: "Semente", 
        img: require('../../assets/garden/semente.png'), 
        cor: "#8d6e63" 
      };
    } else if (xp < 50) {
      return { 
        fase: "Broto", 
        img: require('../../assets/garden/broto.png'), 
        cor: "#aed581" 
      };
    } else if (xp < 75) {
      return { 
        fase: "Arbusto", 
        img: require('../../assets/garden/arbusto.png'), 
        cor: "#8bc34a" 
      };
    } else {
      return { 
        fase: xp >= 100 ? "Pronto para Colher!" : "Árvore de Café", 
        img: require('../../assets/garden/arvore.png'), 
        cor: "#4caf50" 
      };
    }
  };

  const status = getStatusCrescimento();
  const podeColher = xp >= 100;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={[styles.card, podeColher && styles.cardPronto]}>
        
        {/* LADO ESQUERDO: IMAGEM DA PLANTA */}
        <View style={[styles.imageWrapper, { backgroundColor: status.cor + '20' }]}>
          <Image 
            source={status.img} 
            style={styles.plantImage} 
            resizeMode="contain" 
          />
          {podeColher && (
            <View style={styles.badgeAlerta}>
              <Ionicons name="sparkles" size={12} color="#fff" />
            </View>
          )}
        </View>

        {/* CENTRO: BARRA DE PROGRESSO E XP */}
        <View style={styles.infoWrapper}>
          <View style={styles.textRow}>
            <Text style={[styles.labelFase, podeColher && { color: status.cor }]}>
              {status.fase.toUpperCase()}
            </Text>
            <Text style={styles.labelXP}>{xp} / 100 XP</Text>
          </View>
          
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarActive, 
                { width: `${Math.min(xp, 100)}%`, backgroundColor: status.cor }
              ]} 
            />
          </View>
          <Text style={styles.helperText}>
            {podeColher ? "Colheita disponível! Toque aqui." : "Foque para evoluir sua planta"}
          </Text>
        </View>

        {/* LADO DIREITO: ÍCONE DE AÇÃO (ESTILO WIDGET) */}
        <View style={[styles.actionButton, { backgroundColor: status.cor }]}>
          <Ionicons 
            name={podeColher ? "basket" : "leaf"} 
            size={20} 
            color="#fff" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Garante que o botão ocupe toda a largura disponível
    marginVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30, // Arredondamento idêntico ao card do relógio
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardPronto: {
    borderColor: '#4caf50',
    borderWidth: 1.5,
  },
  imageWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  plantImage: {
    width: 75,
    height: 75,
  },
  badgeAlerta: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 3,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoWrapper: {
    flex: 1,
    marginRight: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelFase: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textoEscuro,
  },
  labelXP: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textoEscuro,
    opacity: 0.4,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    borderRadius: 5,
  },
  helperText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: COLORS.textoEscuro,
    opacity: 0.4,
    marginTop: 6,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});