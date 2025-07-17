import React, { useEffect, useState } from "react";

import * as calendar from "./utils/calendar";

interface CalendarProps {
  date?: Date;
  monthNames?: string[];
  weekDaysNames?: string[];
  onChange?: (date: Date, dayWeek?: number) => void;
  onDaySelect: (dayWeek: number) => void;
  resetTrigger?: boolean;
}

export default function Calendar({
  date = new Date(),
  monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  weekDaysNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
  onChange = () => {},
  onDaySelect = () => {},
  resetTrigger = false,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const currentYear = date.getFullYear();

  const monthData = calendar.getMonthData(currentYear, currentMonth);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    onDaySelect(today.getDay());
    onChange(today);
  }, [resetTrigger]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(e.target.value));
  };
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dayWeek = date.getDay();
    onDaySelect(dayWeek);
    onChange(date);
  };

  return (
    <div className="calendar">
      <header>
        <select
          value={currentMonth}
          onChange={handleMonthChange}
          className="select select-success w-full"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </header>
      <div className="overflow-x-auto ">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              {weekDaysNames.map((day) => (
                <th key={day} className="p-1 text-base-content">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, weekIndex) => (
              <tr key={weekIndex} className="hover:bg-inherit">
                {week.map((date, dayIndex) => (
                  <td key={dayIndex} className="p-0">
                    {date && (
                      <button
                        className={`btn btn-md h-10 w-10 ${
                          calendar.areEqual(date, selectedDate)
                            ? "border-accent"
                            : ""
                        }`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date?.getDate()}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
