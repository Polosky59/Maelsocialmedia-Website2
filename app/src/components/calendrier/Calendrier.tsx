"use client";

import { useState } from "react";

interface DataItem {
    date?: string | number;
    timestamp?: string | number;
}

interface CalendrierProps {
    data?: DataItem[];
}

export default function Calendrier({ data = [] }: CalendrierProps) {
    const currentDate = new Date();

    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [selectedDateText, setSelectedDateText] = useState("");

    const getDaysInMonth = (m: number, y: number) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const handleDayClick = (dayNum: number) => {
        setSelectedDateText(`${dayNum}/${month + 1}/${year}`);
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
                        <td key={`empty-${i}-${j}`}></td>
                    );
                } else {
                    const currentDayNum = date;
                    const hasData = data.some((d) => {
                        const dt = new Date(Number(d.date || d.timestamp));
                        return (
                            dt.getDate() === currentDayNum &&
                            dt.getMonth() === month &&
                            dt.getFullYear() === year
                        );
                    });


                    daysInWeek.push(
                        <td
                            key={`day-${currentDayNum}`}
                            className={"border py-8 "}
                            onClick={() => handleDayClick(currentDayNum)}
                        >
                            {currentDayNum}
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

    return (
        <div>
            <p>Sélection : {selectedDateText || "Aucune"}</p>
            <table>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
        </div>
    );
}