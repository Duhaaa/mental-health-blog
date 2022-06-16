export function minutesToRead (text) {
  const words = text.split(' ');
  const minutes = Math.floor(words.length / 200);
  return minutes;
}
