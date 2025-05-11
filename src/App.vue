<script setup>
import TimerDisplay from './components/TimerDisplay.vue';
import { provideTheme } from './themes';
import Toast from 'primevue/toast';

provideTheme();
</script>

<template>
  <TimerDisplay />
  <Toast />
</template>

