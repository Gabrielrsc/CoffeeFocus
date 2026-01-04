// 1. Definição de Cores Básicas
export const COLORS = {
  foco: '#b88686',
  curto: '#5e8d5d',
  longo: '#5d708d',
  card: '#fdfaf6',
  textoEscuro: '#3d2626',
  branco: '#fff',
  fogo: '#FFC107' // Cor do ícone de fogo igual à web
};

// 2. Centralização de Fontes (Para usares no app todo)
export const FONTS = {
  logo: 'NerkoOne_400Regular',
  mono: 'SpaceMono_400Regular',
  monoBold: 'SpaceMono_700Bold',
};

// 3. Configuração dos Modos (Referenciando as cores acima)
export const CONFIGS = {
  foco: { 
    tempo: 1500, 
    cor: COLORS.foco, // Agora usa a variável centralizada
    label: 'Foco', 
    icon: 'fire' 
  },
  curto: { 
    tempo: 300, 
    cor: COLORS.curto, 
    label: 'Curto', 
    icon: 'coffee-outline' 
  },
  longo: { 
    tempo: 900, 
    cor: COLORS.longo, 
    label: 'Longo', 
    icon: 'weather-night' // Ótima escolha para pausa longa!
  }
};