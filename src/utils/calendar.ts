import type { CalendarDate, CalendarMonth } from "typescript-calendar-date";
import { monthName, dayOfWeek, numberOfDaysInMonth } from "typescript-calendar-date";

export type WeekFirstDay = "monday" | "sunday";

export type MonthsDays = {
    "part": {
        "year": number;
        "month": string;
        "day": number;
    };
    "day": string;
    "current": boolean;
    "active"?: boolean;
    "class": string;
};

export const weekDays = {
    "firstDay": {
        "0": "monday",
        "1": "sunday",
    },
    "monday": {
        "short": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        "long": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    "sunday": {
        "short": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        "long": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    }
};

export const getMonthDays = (someYear: number, someMonth: number, someDay = 0): MonthsDays[] => {
    const month: CalendarDate = {
        year: someYear,
        month: monthName(someMonth),
        day: someDay
    };

    const prevMonth: CalendarDate = {
        year: someMonth === 1 ? someYear - 1 : someYear,
        month: monthName(someMonth - 1),
        day: someDay,
    };

    const nextMonth: CalendarDate = {
        year: someMonth === 12 ? Number(someYear + 1) : someYear,
        month: monthName(someMonth + 1),
        day: someDay,
    };

    const firstDay: CalendarDate = {
        ...month,
        day: 1,
    };

    const cols = 7;
    const rows = 6;
    const cells = cols * rows;

    const firstWeekDayOfMonth = dayOfWeek(firstDay);
    const firstWeekDayOfMonthIndex = weekDays.monday.short.indexOf(firstWeekDayOfMonth);
    const daysInMonth = numberOfDaysInMonth(month);
    const daysInPrevMonth = numberOfDaysInMonth(prevMonth);
    const beforeFirstWeekDay = cols - 1 - (cols - 1 - firstWeekDayOfMonthIndex);
    const afterFirstWeekDay = cells - (beforeFirstWeekDay + daysInMonth);

    const daysArray: MonthsDays[] = new Array();

    let count = 0;

    /** Days of the previous month */
    for (let pm = beforeFirstWeekDay; pm > 0; pm--) {
        daysArray.push({
            "part": prevMonth,
            "day": (daysInPrevMonth - (pm - 1)).toString(),
            "current": false,
            "class": "previous-month",
        });
    }

    /** Days of the current month */
    for (let cm = 0; cm < daysInMonth; cm++) {
        const current = someDay === cm + 1;
        
        daysArray.push({
            "part": month,
            "day": (cm + 1).toString(),
            "current": current,
            "class": "current-month",
        });
    }

    /** Days of the next month */
    for (let nm = 0; nm < afterFirstWeekDay; nm++) {
        daysArray.push({
            "part": nextMonth,
            "day": (nm + 1).toString(),
            "current": false,
            "class": "next-month",
        });
    }

    daysArray.forEach((d) => {
        if (count > 4) { d.class = d.class + " weekend"; }
        count = count > 5 ? 0 : count + 1;
    });

    return daysArray;
};
