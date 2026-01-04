import { MaterialCommunityIcons } from '@expo/vector-icons';

// Nomes exatos das fontes para evitar erros de digitação
export const FONT_NAMES = {
  nerko: 'NerkoOne_400Regular',
  mono: 'SpaceMono_400Regular',
  monoBold: 'SpaceMono_700Bold',
};

// Mapeamento centralizado de ícones
export const APP_ICONS = {
  foco: 'fire',
  curto: 'coffee-outline',
  longo: 'clock-outline',
  config: 'settings-sharp',
  historico: 'history',
};

// Componente de ícone padrão do projeto
export const Icon = ({ name, size = 24, color = '#fff', style }) => (
  <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
);