<template>
    <div class="grid grid-cols-7 gap-2 p-3">
        <template v-for="day, i in weekDays.short" :key="i">
            <span class="week-day" :class="{ 'weekend': day === 'sat' || day === 'sun' }" :title="weekDays.long[i]">
                {{ day[0] }}
            </span>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { weekDays as wD } from "@/utils/calendar";
import type { WeekFirstDay } from "@/utils/calendar";

const props = defineProps<{
    firstDay: WeekFirstDay;
}>();

const weekDays = wD[props.firstDay];
</script>

<style>
.week-day {
    @apply
        w-[42px] h-[42px] rounded-full
        flex items-center justify-center
        capitalize text-center font-bold text-teal-600;
}

.week-day.weekend {
    @apply bg-sky-500/5;
}
</style>