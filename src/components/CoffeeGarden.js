import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';

export const CoffeeGarden = ({ xp }) => {
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
        fase: "Pronto p/ Colheita", 
        img: require('../../assets/garden/arvore.png'), 
        cor: "#4caf50" 
      };
    }
  };

  const status = getStatusCrescimento();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Visual da Planta Miniatura */}
        <View style={[styles.imageWrapper, { backgroundColor: status.cor + '15' }]}>
          <Image 
            source={status.img} 
            style={styles.plantImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Info de Experiência */}
        <View style={styles.infoWrapper}>
          <View style={styles.textRow}>
            <Text style={styles.labelFase}>{status.fase.toUpperCase()}</Text>
            <View style={styles.xpBadge}>
                <Text style={styles.labelXP}>{xp} XP</Text>
            </View>
          </View>
          
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarActive, 
                { width: `${Math.min(xp, 100)}%`, backgroundColor: status.cor }
              ]} 
            />
          </View>
          <Text style={styles.helperText}>Toque para ver a evolução</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plantImage: {
    width: 32,
    height: 32,
  },
  infoWrapper: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelFase: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textoEscuro,
  },
  xpBadge: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelXP: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textoEscuro,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    borderRadius: 3,
  },
  helperText: {
    fontFamily: FONTS.mono,
    fontSize: 8,
    color: COLORS.textoEscuro,
    opacity: 0.3,
    marginTop: 4,
    textAlign: 'right'
  },
});