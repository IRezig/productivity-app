import { computed, ref } from "vue";
import { useToast } from "./useToast";

export const useTimer = () => {
  const { showSuccess } = useToast();
  const modes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
    test: 3,
  };

  const modesList = Object.keys(modes);
  const modesListWithTime = modesList.map((mode) => ({
    name: mode,
    time: modes[mode],
  }));

  const mode = ref("pomodoro");
  const timeLeft = ref(modes[mode.value]);
  const isRunning = ref(false);
  const isCompleted = ref(false);
  const timerId = ref<number | null>(null);

  const tick = () => {
    if (!isRunning.value) return;
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      stop();
      isCompleted.value = true;
    }
  };

  const start = () => {
    if (isRunning.value) return;
    isRunning.value = true;
    if (timerId.value !== null) return; // Prevent multiple intervals
    timerId.value = window.setInterval(() => {
      tick();
    }, 1000);
  };

  const stop = () => {
    isRunning.value = false;
    if (timerId.value !== null) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const reset = () => {
    stop();
    timeLeft.value = modes[mode.value];
  };

  const setMode = (newMode: keyof typeof modes) => {
    stop();
    mode.value = newMode;
    timeLeft.value = modes[newMode];
  };

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });

  const progress = computed(() => {
    return 100 - (timeLeft.value / modes[mode.value]) * 100;
  });

  const showSuccessToast = () => {
    showSuccess(Math.max(1, Math.round(modes[mode.value] / 60)));
    isCompleted.value = false;
  };

  return {
    timeLeft,
    modes,
    isRunning,
    isCompleted,
    start,
    stop,
    reset,
    setMode,
    modesListWithTime,
    formattedTime,
    progress,
    showSuccessToast,
  };
};
