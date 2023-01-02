<template>
    <div class="calendar-grid">
        <template v-for="md, index in daysArray" :key="md.part.year + md.part.month + md.day">
            <button :id="`${md.part.year}-${monthNumber(md.part.month as Month) < 10 ? '0' + monthNumber(md.part.month as Month) : monthNumber(md.part.month as Month)}-${Number(md.day) < 10 ? '0' + md.day : md.day}`" ref="dayBtn" @click="(event: Event) => $emit('onDayClick', md, event)" :class="[{ current: md.current }, md.class]" class="calendar-day">
                {{ md["day"] }}
            </button>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { monthNumber, parseIso8601String } from "typescript-calendar-date";
import { ref, watch, onUpdated } from "vue";

import type { MonthsDays } from "@/utils/calendar";
import type { Month } from "typescript-calendar-date/dist/consts";

const props = defineProps<{
    daysArray: MonthsDays[];
    dateParts: string;
    modelValue: HTMLInputElement | undefined;
}>();

const dayBtn = ref<HTMLElement[]>([]);

onUpdated(() => {
    console.log(parseIso8601String(props.modelValue?.id as string));
});

watch(
    () => props.modelValue,
    () => {
        dayBtn.value.forEach(element => {
            element.classList.remove("active");
        });

        props.modelValue?.classList.add("active");
    }
);
</script>

<style>
.calendar-day.weekend {
    @apply bg-sky-500/5;
}

.current-month {
    @apply !text-black;
}

.calendar-day {
    @apply
        w-[42px] h-[42px]
        text-center rounded-full border-none
        transition-colors text-zinc-400 hover:bg-cyan-500/25;
}

.calendar-day.current {
    @apply bg-teal-500/25;
}

.calendar-day.active {
    @apply bg-cyan-500/25;
}
</style>