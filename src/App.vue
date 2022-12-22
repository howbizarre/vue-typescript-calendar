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
                <span v-for="day in weekDays" class="week-day" :title="day">
                    {{ day[0] }}
                </span>
                <template v-for="md in monthDaysArray">
                    <button @click="(event: Event) => getEvents(md, event)" :class="[{ current: md.current }, md.class, { active: isActive }]" class="calendar-day">
                        {{ md["day"] }}
                    </button>
                </template>
            </div>
        </div>

        <div class="flex justify-between items-center p-4 leading-normal text-teal-700 bg-teal-100 rounded-b-2xl border border-b-4 border-teal-500" role="alert">
            <span>The chosen day is <strong>{{ dateParts }}</strong></span>

            <a href="https://github.com/howbizarre/vue-typescript-calendar" title="Vue 3 with Typescript Calendar and Tailwindcss">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="flex-shrink-0 h-5 w-5" style="" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247Z"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { monthName } from "typescript-calendar-date";
import { ref, computed } from "vue";
import { weekDays as wD, getMonthDays } from "@/utils/calendar";
import type { WeekFirstDay, monthsDays } from "@/utils/calendar";

type DirectionNumber = 1 | 0 | -1;

const firstDayOfTheWeek: WeekFirstDay = "monday";
const weekDays = wD[firstDayOfTheWeek].long;

const date = new Date();
const year = ref(date.getFullYear());
const month = ref(date.getMonth() + 1);
const day = ref(date.getDate());

const nameOfMonth = ref(monthName(month.value));
const monthDaysArray = ref(getMonthDays(year.value, month.value, day.value));

const resetMonth = ref(false);
const isActive = ref(false);

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
const setMDA = (direction?: DirectionNumber): void => {
    const mV = month.value;
    const yV = year.value;
    const jan = mV === 1;
    const dec = mV === 12;
    const drctn = direction || 0;

    switch (drctn) {
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

const dateParts = ref(`${day.value} ${nameOfMonth.value.charAt(0).toUpperCase() + nameOfMonth.value.slice(1)} ${year.value}`);

const getEvents = (date: monthsDays, e: Event) => {
    e.preventDefault();

    (e.target as HTMLInputElement).classList.add("active");

    const month = date.part.month;
    dateParts.value = `${date.day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${date.part.year}`;
};
</script>

<style>
html,
body {
    @apply font-sans;
}

.calendar-action {
    @apply
        flex items-center justify-center
        mr-3 px-2 w-[42px] h-[42px]
        transition-colors fill-zinc-400 hover:fill-zinc-900 bg-teal-500/5 hover:bg-teal-500/25
        rounded-3xl;
}

.calendar-action.empty {
    @apply !bg-transparent;
}

.week-day {
    @apply
        w-[42px] h-[42px]
        flex items-center justify-center
        capitalize text-center font-bold text-teal-600;
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