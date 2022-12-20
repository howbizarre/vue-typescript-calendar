<template>
    <div class="p-3 max-w-sm">
        <div class="rounded-2xl border p-3">
            <div class="flex justify-between">
                <h1 class="p-3 text-left capitalize text-2xl font-serif">{{ nameOfMonth }} {{ year }}</h1>

                <div class="flex items-center">
                    <button @click="setMDA(-1)" class="calendar-action">
                        &laquo;
                    </button>

                    <button v-if="resetMonth" @click="setMDA(0)" class="calendar-action">
                        x
                    </button>
                    <span v-else class="calendar-action empty">
                        &nbsp;&nbsp;
                    </span>

                    <button @click="setMDA(1)" class="calendar-action">
                        &raquo;
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
                <span v-for="day in weekDays" class="week-day">
                    {{ day[0] }}
                </span>
                <template v-for="md in monthDaysArray">
                    <button @click="(event: Event) => getEvents(md, event)" :class="[{ current: md.current }, md.class]" class="calendar-day">
                        {{ md["day"] }}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { monthName } from "typescript-calendar-date";
import { weekDays as wD, getMonthDays } from "@/utils/calendar";
import { ref } from "vue";

const firstDayOfTheWeek = "monday";
const weekDays = wD[firstDayOfTheWeek].short;

const date = new Date();
const year = ref(date.getFullYear());
const month = ref(date.getMonth() + 1);
const day = ref(date.getDate());

const nameOfMonth = ref(monthName(month.value));
const monthDaysArray = ref(getMonthDays(year.value, month.value, day.value));

const resetMonth = ref(false);

/**
 * If set direction to -1 mean month before current
 * If set direction to 1 mean month after current
 * @param direction numer 1 or -1
 * @external month.value
 * @external year.value
 * @external monthDaysArray.value
 * @external nameOfMonth.value
 * @external resetMonth.value
 */
const setMDA = (direction: number): void => {
    const mV = month.value;
    const yV = year.value;
    const jan = mV === 1;
    const dec = mV === 12;

    switch (direction) {
        case -1:
            month.value = jan ? 12 : mV - 1;
            year.value = jan ? yV - 1 : yV;
            monthDaysArray.value = getMonthDays(year.value, month.value);
            nameOfMonth.value = monthName(month.value);
            resetMonth.value = true;

            break;

        case 1:
            month.value = dec ? 1 : mV + 1;
            year.value = dec ? yV + 1 : yV;
            monthDaysArray.value = getMonthDays(year.value, month.value);
            nameOfMonth.value = monthName(month.value);
            resetMonth.value = true;

            break;

        default:
            month.value = new Date().getMonth() + 1;
            year.value = new Date().getFullYear();
            monthDaysArray.value = getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
            nameOfMonth.value = monthName(new Date().getMonth() + 1);
            resetMonth.value = false;
    }
}

const getEvents = (day: any, e: Event) => {
    e.preventDefault();
};
</script>

<style>
html,
body {
    @apply font-sans;
}

.calendar-action {
    @apply mr-3 text-black px-2 border rounded-3xl w-[42px] h-[42px];
}

.calendar-action.empty {
    @apply border-none;
}

.week-day {
    @apply capitalize text-center flex items-center justify-center w-[42px] h-[42px] text-black;
}

.current-month {
    @apply !text-black;
}

.calendar-day {
    @apply text-center w-[42px] h-[42px] rounded-full border-none text-zinc-400 hover:bg-zinc-300;
}

.calendar-day.current {
    @apply bg-emerald-500/25;
}
</style>