import { useFonts } from 'expo-font';
import { NerkoOne_400Regular } from '@expo-google-fonts/nerko-one';
import { SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';

export const useAppResources = () => {
  const [fontsLoaded] = useFonts({
    NerkoOne_400Regular,
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  return { fontsLoaded };
};