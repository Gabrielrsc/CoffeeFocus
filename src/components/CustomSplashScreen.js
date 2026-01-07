import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Image, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS, FONTS } from '../styles/theme';

// Oculta a splash screen nativa para que a nossa personalizada possa aparecer
SplashScreen.preventAutoHideAsync();

export const CustomSplashScreen = ({ onFinish }) => {
  const animacaoLogo = useRef(new Animated.Value(0)).current; // 0 = invisível, 1 = visível
  const animacaoEscala = useRef(new Animated.Value(0.5)).current; // 0.5 = pequena, 1 = tamanho normal
  const animacaoTexto = useRef(new Animated.Value(0)).current; // 0 = invisível, 1 = visível

  useEffect(() => {
    // Sequência de animações:
    // 1. Logo aparece e cresce
    // 2. Texto "CoffeeFocus" aparece
    // 3. Espera um pouco
    // 4. Desaparece (onFinish é chamado)
    Animated.sequence([
      Animated.parallel([
        Animated.timing(animacaoLogo, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(animacaoEscala, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(animacaoTexto, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(1500), // Tempo que a splash screen fica visível
      Animated.timing(animacaoLogo, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(animacaoTexto, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      SplashScreen.hideAsync(); // Oculta a splash screen nativa (se ainda estiver lá)
      onFinish(); // Chama a função para renderizar o App.js
    });
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: animacaoLogo, transform: [{ scale: animacaoEscala }] }}>
        <Image 
          source={require('../../assets/garden/arvore.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </Animated.View>
      <Animated.Text style={[styles.appName, { opacity: animacaoTexto }]}>
        CoffeeFocus
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.branco, // Fundo da sua splash screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200, // Tamanho da sua árvore animada
    height: 200,
  },
  appName: {
    fontFamily: FONTS.logo, // Assumindo que você tem uma fonte de logo
    fontSize: 36,
    color: COLORS.textoEscuro,
    marginTop: 20,
  },
});