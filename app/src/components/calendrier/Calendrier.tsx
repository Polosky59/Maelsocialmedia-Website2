"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataItem {
    date?: string;
    heure?: string | null;
    [key: string]: unknown;
}

export interface CalendrierProps {
    data?: DataItem[];
    selectedDate: number | null;
    setSelectedDate: (day: number) => void;
    onMonthChange?: (newMonth: number, newYear: number) => void;
}

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function Calendrier({ data = [], selectedDate, setSelectedDate, onMonthChange }: CalendrierProps) {
    const currentDate = new Date();

    const [day] = useState(currentDate.getDate());
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());

    const getDaysInMonth = (m: number, y: number) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const handleDayClick = (dayNum: number) => {
        setSelectedDate(dayNum);
    };

    const getEventCount = (dayNum: number) => {
        const formattedMonth = String(month + 1).padStart(2, "0");
        const formattedDay = String(dayNum).padStart(2, "0");
        const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

        return data.filter((item) => item.date === dateStr).length;
    };

    const renderCalendar = () => {
        const weeks = [];
        const daysInMonth = getDaysInMonth(month, year);
        const firstDayIndex = new Date(year, month, 1).getDay();
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const daysInWeek = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayIndex) || date > daysInMonth) {
                    daysInWeek.push(
                        <td key={`empty-${i}-${j}`} className="bg-zinc-950/60 border border-zinc-800/80"></td>
                    );
                } else {
                    const currentDayNum = date;
                    const eventCount = getEventCount(currentDayNum);

                    daysInWeek.push(
                        <td
                            key={`day-${currentDayNum}`}
                            onClick={() => handleDayClick(currentDayNum)}
                            className={`p-2 border border-zinc-800/80 cursor-pointer align-top ${currentDayNum === selectedDate ? "bg-zinc-900 font-bold" : ""
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={`px-2 py-1 rounded-full ${currentDayNum === day &&
                                        month === currentDate.getMonth() &&
                                        year === currentDate.getFullYear()
                                        ? "bg-emerald-500/60 text-white font-bold"
                                        : ""
                                        }`}
                                >
                                    {currentDayNum}
                                </span>
                                {eventCount > 0 && (
                                    <span className="flex items-center justify-center h-5 px-1.5 text-xs text-white bg-rose-500 rounded-full font-bold">
                                        {eventCount}
                                    </span>
                                )}
                            </div>
                        </td>
                    );
                    date++;
                }
            }
            weeks.push(<tr key={`week-${i}`}>{daysInWeek}</tr>);
            if (date > daysInMonth) {
                break;
            }
        }
        return weeks;
    };

    const handlePrevMonth = () => {
        let newM = month - 1;
        let newY = year;
        if (month === 0) {
            newM = 11;
            newY = year - 1;
        }
        setMonth(newM);
        setYear(newY);
        onMonthChange?.(newM + 1, newY); // +1 car JS compte de 0 à 11
    };

    const handleNextMonth = () => {
        let newM = month + 1;
        let newY = year;
        if (month === 11) {
            newM = 0;
            newY = year + 1;
        }
        setMonth(newM);
        setYear(newY);
        onMonthChange?.(newM + 1, newY);
    };

    const handleTodayClick = () => {
        const now = new Date();
        const m = now.getMonth();
        const y = now.getFullYear();
        setMonth(m);
        setYear(y);
        onMonthChange?.(m + 1, y);
    };

    return (
        <div className="flex flex-col h-full w-full text-zinc-100 select-none">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-xl font-semibold capitalize tracking-wide text-zinc-100">
                    {MONTHS[month]} <span className="text-zinc-500 font-normal">{year}</span>
                </h2>
                <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                    <button
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition"
                        onClick={handlePrevMonth}
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition"
                        onClick={() => {
                            handleTodayClick
                        }}
                    >
                        Aujourd'hui
                    </button>
                    <button
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition"
                        onClick={handleNextMonth}
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
            <table className="h-full w-full">
                <thead>
                    <tr>
                        {DAYS.map((day) => (
                            <th key={day} className="pb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider text-center">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="border border-zinc-800/80 border-collapse">{renderCalendar()}</tbody>
            </table>
        </div>
    );
}