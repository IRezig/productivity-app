<template>
    <div>
        <h1 class="text-4xl font-bold text-center theme-transition" :style="{ color: theme.themeColors.text }" >
            Deep Work
          </h1>   
        <div class="h-70 w-full flex flex-col items-center justify-center border-2 rounded-lg p-4 shadow-md mt-10" :style="{ backgroundColor: theme.themeColors.background }">
            <p class="text-6xl font-bold" :style="{ color: theme.themeColors.primary }">{{ formattedTime }}</p>
            <div
                class="w-full h-2 rounded-full relative mt-8"
                :style="{ backgroundColor: theme.themeColors.secondary }"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0" 
                :aria-valuemax="100"
                tabindex="0"
                aria-label="Timer progress"
            >
                <div
                    class="h-full rounded-full absolute left-0 top-0 transition-all"
                    :style="{ width: progress + '%', backgroundColor: theme.themeColors.primary }"
                ></div>
            </div>
        </div>
        <div class="flex gap-2 justify-center items-center mt-8">
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" v-for="mode in modesListWithTime" :key="mode.name" @click="setMode(mode.name)">
                {{ mode.name }}
            </button>
        </div>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" v-if="!isRunning" @click="start">
                <PlayIcon class="size-6" />
            </button>
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" v-if="isRunning" @click="stop">
                <StopIcon class="size-6" />
            </button>
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" @click="reset">
                <ArrowPathRoundedSquareIcon class="size-6" />
            </button>
        </div>
       
        <h3 class="text-2xl font-bold mt-4 flex items-center gap-2 justify-center" :style="{ color: theme.themeColors.text }"> 
            <SpeakerWaveIcon class="size-6" />
            Sounds
        </h3>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.primary}` }" @click="playSound('rain')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <!-- Cloud -->
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                
                <!-- Raindrops -->
                <line x1="8" y1="18" x2="8" y2="20" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
                <line x1="12" y1="18" x2="12" y2="20" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
                <line x1="16" y1="18" x2="16" y2="20" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
                </svg>

            </button>
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.primary}` }" @click="playSound('wind')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h12a2 2 0 1 0-2-2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16a2 2 0 1 1-2 2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2 16h10a2 2 0 1 0-2 2" />
                </svg>
            </button>
        </div>
        <h3 class="text-2xl font-bold mt-4 flex items-center gap-2 justify-center" :style="{ color: theme.themeColors.text }"> 
            <BeakerIcon class="size-6" />
            Themes
        </h3>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.primary}` }" v-for="themeName in themes" :key="themeName" @click="theme.setTheme(themeName)">
                {{ themeName.charAt(0).toUpperCase() + themeName.slice(1) }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useTimer } from '../composables/useTimer';
import { useSound } from '../composables/useSound';
import { useTheme } from '../themes';
import { BeakerIcon, PlayIcon, StopIcon, SpeakerWaveIcon, ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/outline'

const {  isRunning, isCompleted, start, stop, reset, setMode, modesListWithTime, formattedTime, progress, showSuccessToast } = useTimer();
const { playSound } = useSound();
const themes = ['pastel', 'forest', 'ocean', 'berry'] as const
const theme = useTheme();

watch(isCompleted, () => {
    if (isCompleted.value) showSuccessToast();
});


</script>