import { useAudioPlayer } from 'expo-audio';

export const useSound = () => {
  const clickSource = require('../../assets/click.mp3');
  const alarmSource = require('../../assets/alarm.mp3');
  const player = useAudioPlayer(clickSource);

  async function playSound(type, somHabilitado = true) {
    if (!somHabilitado) return; // Se o som estiver desligado, não faz nada

    try {
      const source = type === 'click' ? clickSource : alarmSource;
      await player.replace(source);
      player.play();
    } catch (error) {
      console.log("Erro ao tocar som:", error);
    }
  }

  return { playSound };
};