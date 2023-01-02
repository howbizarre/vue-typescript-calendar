<template>
    <div class="p-3 max-w-sm">
        <div class="rounded-t-2xl border border-b-0 border-t-4 border-teal-500/50 pb-3">
            <div class="flex justify-between mb-3 border-b border-b-teal-500/50 p-3">
                <h1 @click="setDate = !setDate" v-if="!setDate" class="p-3 text-left capitalize text-3xl font-serif">{{ nameOfMonth }} {{ year }}</h1>
                <div v-if="setDate" class="grid grid-cols-3 p-3 text-left capitalize text-3xl font-serif">
                    <div>
                        <select v-model="month" class="bg-white">
                            <option v-for="i in 12" :value="i">{{ monthName(i).charAt(0).toUpperCase() + monthName(i).slice(1) }}</option>
                        </select>
                    </div>
                    <div class="col-span-2"><input class="w-full" type="number" v-model="year" /></div>
                </div>

                <div class="flex items-center" v-if="!setDate">
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
                <div class="flex items-center" v-if="setDate">
                    <button class="calendar-action" @click="setYear(year, month)">
                        <svg width="32" height="32" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M104 192a8.5 8.5 0 0 1-5.7-2.3l-56-56a8.1 8.1 0 0 1 11.4-11.4l50.3 50.4L210.3 66.3a8.1 8.1 0 0 1 11.4 11.4l-112 112a8.5 8.5 0 0 1-5.7 2.3Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <WeekDays :firstDay="firstDayOfTheWeek" />
            <MonthDays :daysArray="monthDaysArray" :dateParts="dateParts" @onDayClick="dayClick" v-model="activatElm" />
        </div>

        <div>
        </div>

        <FooterLabel :dateParts="dateParts" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { monthName } from "typescript-calendar-date";
import { type WeekFirstDay, type MonthsDays, getMonthDays } from "@/utils/calendar";

/** Cpmponents */
import WeekDays from "@/components/WeekDays.vue";
import MonthDays from "@/components/MonthDays.vue";
import FooterLabel from "@/components/FooterLabel.vue";

/**
 * The values of calendar moving
 * 1 for forwar moving
 * -1 for backward moving
 * 0 for reseting at the start point
 */
type DirectionNumber = 1 | 0 | -1;

/**
 * Set custom date to components
 * different from normal flow - backward or forward
 */
const setDate = ref(false);

/**
 * Must be rewrite the engine
 * to obtain which day of the week are first day
 */
const firstDayOfTheWeek: WeekFirstDay = "monday";

const curDate = new Date();

const year = ref(curDate.getFullYear());
const month = ref(curDate.getMonth() + 1);
const day = ref(curDate.getDate());

const nameOfMonth = ref(monthName(month.value));
const monthDaysArray = ref(getMonthDays(year.value, month.value, day.value));

const resetMonth = ref(false);
const dateParts = ref(`${day.value} ${nameOfMonth.value.charAt(0).toUpperCase() + nameOfMonth.value.slice(1)} ${year.value}`);

/**
 * Element clicked on
 */
const activatElm = ref<HTMLInputElement>();

/**
 * Pass parameters to components
 * @param date
 * @param evn
 * @external activatElm
 * @external dateParts
 */
const dayClick = (date: MonthsDays, evn: Event) => {
    const month = date.part.month;

    activatElm.value = evn.target as HTMLInputElement;
    dateParts.value = `${date.day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${date.part.year}`;
};

/**
 * If set direction to "-1" - draw month before
 * If set direction to "1" - draw month after
 * If set direction to "0" - reset to current month
 * @param direction numer 1 or -1 or 0
 * @external curDate
 * @external month
 * @external year
 * @external monthDaysArray
 * @external nameOfMonth
 * @external resetMonth
 * @function getMonthDays
 * @function monthName
 */
const setMDA = (direction?: DirectionNumber): void => {
    const mV = month.value;
    const yV = year.value;
    const jan = mV === 1;
    const dec = mV === 12;
    const drctn = direction || 0;

    const curDay = curDate.getDate();
    const curMonth = curDate.getMonth() + 1;
    const curMonthName = monthName(curMonth) as string;
    const curYear = curDate.getFullYear();

    switch (drctn) {
        case -1:
            month.value = jan ? 12 : mV - 1;
            year.value = jan ? yV - 1 : yV;

            resetMonth.value = month.value !== curMonth || year.value !== curYear;
            monthDaysArray.value = getMonthDays(year.value, month.value, resetMonth.value ? 0 : curDay);
            nameOfMonth.value = monthName(month.value);

            break;

        case 1:
            month.value = dec ? 1 : mV + 1;
            year.value = dec ? yV + 1 : yV;

            resetMonth.value = month.value !== curMonth || year.value !== curYear;
            monthDaysArray.value = getMonthDays(year.value, month.value, resetMonth.value ? 0 : curDay);
            nameOfMonth.value = monthName(month.value);

            break;

        default:
            month.value = curMonth;
            year.value = curYear;

            resetMonth.value = false;
            monthDaysArray.value = getMonthDays(year.value, month.value, curDay);
            nameOfMonth.value = monthName(month.value);

            dateParts.value = `${curDay} ${curMonthName[0].toUpperCase() + curMonthName.slice(1)} ${curYear}`;
    }
};

const setYear = (y: number, m: number): void => {
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth() + 1;

    resetMonth.value = m !== curMonth || y !== curYear;
    nameOfMonth.value = monthName(m);
    monthDaysArray.value = getMonthDays(y, m, resetMonth.value ? 0 : curDate.getDate());
    setDate.value = false;
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
        ml-3 px-2 w-[42px] h-[42px]
        transition-colors fill-zinc-400 hover:fill-zinc-900 bg-teal-500/5 hover:bg-teal-500/25
        rounded-3xl;
}

.calendar-action.empty {
    @apply !bg-transparent;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>