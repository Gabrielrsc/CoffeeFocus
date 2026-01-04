export const formatarTempo = (tempoSegundos) => {
  const minutos = Math.floor(tempoSegundos / 60);
  const segundos = tempoSegundos % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
};