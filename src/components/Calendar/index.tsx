import React, { useState } from "react";

import * as calendar from "./calendar";

interface CalendarProps {
  date?: Date;
  monthNames?: string[];
  weekDaysNames?: string[];
  onChange?: (date: Date, dayWeek?: number) => void;
  onDaySelect: (dayWeek: number) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
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
}) => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  const currentYear = date.getFullYear();

  const monthData = calendar.getMonthData(currentYear, currentMonth);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(e.target.value));
    console.log(e.target.value);
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
          className="select select-success"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </header>
      <div className="overflow-x-auto">
        <table className="table-md">
          <thead>
            <tr>
              {weekDaysNames.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dayIndex) => (
                  <td key={dayIndex}>
                    {date && (
                      <button className="btn btn-md" onClick={()=>handleDateClick(date)}>{date?.getDate()}</button>
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
};
