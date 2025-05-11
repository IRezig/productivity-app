<template>
    <div>
        <div>
            <p class="text-4xl font-bold">{{ formattedTime }}</p>
        </div>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button v-if="!isRunning" @click="start">Start</button>
            <button v-if="isRunning" @click="stop">Stop</button>
            <button @click="reset">Reset</button>
        </div>
        <div class="flex gap-2 justify-center items-center mt-4">
            <button v-for="mode in modesListWithTime" :key="mode.name" @click="setMode(mode.name)">
                {{ mode.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTimer } from '../composables/useTimer';

const { isRunning, start, stop, reset, setMode, modesListWithTime, formattedTime } = useTimer();

</script>