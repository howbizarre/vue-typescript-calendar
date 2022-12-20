<template>
    <div class="p-3 max-w-sm">
        <div class="rounded-t-2xl border border-b-0 border-t-4 border-teal-500 p-3">
            <div class="flex justify-between">
                <h1 class="p-3 text-left capitalize text-3xl font-serif">{{ nameOfMonth }} {{ year }}</h1>

                <div class="flex items-center">
                    <button @click="setMDA(-1)" class="calendar-action">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
                            <g data-name="arrowhead-left">
                                <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />
                                <path d="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z" />
                                <path d="M14.29 12l4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63z" />
                            </g>                            
                        </svg>
                    </button>

                    <button v-if="resetMonth" @click="setMDA(0)" class="calendar-action">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
                            <g data-name="close">
                                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                                <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                            </g>                            
                        </svg>
                    </button>
                    <span v-else class="calendar-action empty">
                        &nbsp;&nbsp;
                    </span>

                    <button @click="setMDA(1)" class="calendar-action">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
                            <g data-name="arrowhead-right">
                                <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
                                <path d="M18.78 11.37l-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z" />
                                <path d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z" />
                            </g>                            
                        </svg>
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
        <div class="p-4 text-center leading-normal text-teal-700 bg-teal-100 rounded-b-2xl border border-b-4 border-teal-500" role="alert">
            <p>The chosen day is <strong>{{ datePart }}</strong></p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { monthName } from "typescript-calendar-date";
import { ref } from "vue";
import { weekDays as wD, getMonthDays } from "@/utils/calendar";
import type { WeekFirstDay, monthsDays } from "@/utils/calendar";

const firstDayOfTheWeek: WeekFirstDay = "monday";
const weekDays = wD[firstDayOfTheWeek].short;

const date = new Date();
const year = ref(date.getFullYear());
const month = ref(date.getMonth() + 1);
const day = ref(date.getDate());

const nameOfMonth = ref(monthName(month.value));
const monthDaysArray = ref(getMonthDays(year.value, month.value, day.value));

const resetMonth = ref(false);

/**
 * If set direction to "-1" - draw month before
 * If set direction to "1" - draw month after
 * If set direction to "0" - reset to current month
 * 
 * @param direction numer 1 or -1 or 0
 * 
 * @external month.value
 * @external year.value
 * @external monthDaysArray.value
 * @external nameOfMonth.value
 * @external resetMonth.value
 * 
 * @function getMonthDays
 * @function monthName
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

const datePart = ref(`${day.value} ${nameOfMonth.value.charAt(0).toUpperCase() + nameOfMonth.value.slice(1)} ${year.value}`);

const getEvents = (date: monthsDays, e: Event) => {
    e.preventDefault();
    datePart.value = `${date.day} ${date.part.month.charAt(0).toUpperCase() + date.part.month.slice(1)} ${date.part.year}`;
};
</script>

<style>
html,
body {
    @apply font-sans;
}

.calendar-action {
    @apply mr-3 fill-zinc-400 hover:fill-zinc-900 px-2 bg-teal-500/5 hover:bg-teal-500/25 transition-colors rounded-3xl w-[42px] h-[42px] flex items-center justify-center;
}

.calendar-action.empty {
    @apply !bg-transparent;
}

.week-day {
    @apply capitalize text-center flex items-center justify-center w-[42px] h-[42px] text-teal-600 font-bold;
}

.current-month {
    @apply !text-black;
}

.calendar-day {
    @apply text-center w-[42px] h-[42px] rounded-full border-none text-zinc-400 hover:bg-teal-500/25 transition-colors;
}

.calendar-day.current {
    @apply bg-teal-500/25;
}
</style>