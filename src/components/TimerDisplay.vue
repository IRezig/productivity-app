<template>
    <div>
        <div class="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 shadow-md">
            <p class="text-6xl font-bold">{{ formattedTime }}</p>
            <div
                class="w-full h-2 bg-red-200 rounded-full relative mt-4"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                :aria-valuemax="100"
                tabindex="0"
                aria-label="Timer progress"
            >
                <div
                    class="h-full bg-red-600 rounded-full absolute left-0 top-0 transition-all"
                    :style="{ width: progress + '%' }"
                ></div>
            </div>
        </div>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button class="text-white px-4 py-2 rounded-md" v-if="!isRunning" @click="start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </button>
            <button class="text-white px-4 py-2 rounded-md" v-if="isRunning" @click="stop">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
            </button>
            <button  @click="reset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
            </button>
        </div>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button v-for="mode in modesListWithTime" :key="mode.name" @click="setMode(mode.name)">
                {{ mode.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTimer } from '../composables/useTimer';

const { timeLeft, modes, isRunning, start, stop, reset, setMode, modesListWithTime, formattedTime, progress } = useTimer();

const mode = ref("pomodoro");


</script>