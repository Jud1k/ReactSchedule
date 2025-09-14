import * as calendar from "./utils/calendar";
import { useStores } from "@/root-store-context";
import { observer } from "mobx-react-lite";

const Calendar = observer(() => {
  const { calendarStore } = useStores();

  const monthData = calendar.getMonthData(
    calendarStore.currentYear,
    calendarStore.currentMonth
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    calendarStore.setMonth(Number(e.target.value));
  };

  const handleDateClick = (date: Date) => {
    calendarStore.setDate(date);
  };

  return (
    <div className="calendar">
      <header>
        <select
          value={calendarStore.currentMonth}
          onChange={handleMonthChange}
          className="select select-success w-full"
        >
          {calendarStore.monthNames.map((name, index) => (
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
              {calendarStore.weekDayNames.map((day) => (
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
                          calendar.areEqual(date, calendarStore.selectedDate)
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
});

export default Calendar;
