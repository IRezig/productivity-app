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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </button>
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" v-if="isRunning" @click="stop">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
            </button>
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.secondary}` }" @click="reset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
            </button>
        </div>
       
        <h3 class="text-2xl font-bold mt-4 flex items-center gap-2 justify-center" :style="{ color: theme.themeColors.text }"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z" />
            </svg>
            Themes
        </h3>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button :style="{ backgroundColor: theme.themeColors.background, color: theme.themeColors.text, border: `2px solid ${theme.themeColors.primary}` }" v-for="themeName in themes" :key="themeName" @click="theme.setTheme(themeName)">
                {{ themeName }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTimer } from '../composables/useTimer';
import { useSound } from '../composables/useSound';
import { useTheme } from '../themes';

const { timeLeft, modes, isRunning, isCompleted, start, stop, reset, setMode, modesListWithTime, formattedTime, progress, showSuccessToast } = useTimer();
const { playSound } = useSound();
const themes = ['Pastel', 'Forest', 'Ocean', 'Berry'] as const
const theme = useTheme();

watch(isCompleted, () => {
    if (isCompleted.value) {
        console.log('isCompleted', isCompleted.value);
        showSuccessToast();
    }
});


</script>