import { ref } from "vue";

const rainAudio = new Audio("/src/assets/sounds/rain.mp3");
const windAudio = new Audio("/src/assets/sounds/wind.mp3");

export const useSound = () => {
  const isRainSoundPlaying = ref(false);
  const isWindSoundPlaying = ref(false);

  const playSound = (sound: "rain" | "wind") => {
    if (sound === "rain") {
      if (!isRainSoundPlaying.value) {
        rainAudio.play();
        rainAudio.loop = true;
        isRainSoundPlaying.value = true;
      } else {
        rainAudio.pause();
        isRainSoundPlaying.value = false;
      }
      return;
    }
    if (sound === "wind") {
      if (!isWindSoundPlaying.value) {
        windAudio.play();
        windAudio.loop = true;
        isWindSoundPlaying.value = true;
      } else {
        windAudio.pause();
        isWindSoundPlaying.value = false;
      }
      return;
    }
  };

  return {
    isRainSoundPlaying,
    isWindSoundPlaying,
    playSound,
  };
};
