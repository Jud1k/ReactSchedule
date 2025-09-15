import { makeAutoObservable } from "mobx";

class CalendarStore {
  private _selectedDate = new Date();

  readonly monthNames: string[] = [
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
  ];

  readonly weekDayNames: string[] = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  constructor() {
    makeAutoObservable(this);
  }

  get selectedDayWeek() {
    return this._selectedDate.getDay();
  }

  get currentMonth(): number {
    return this._selectedDate.getMonth();
  }

  get currentYear(): number {
    return this._selectedDate.getFullYear();
  }

  get selectedDate(): Date {
    return new Date(this._selectedDate);
  }

  setDate(date: Date) {
    this._selectedDate = date;
  }

  setMonth(month: number) {
    const newDate = new Date(this._selectedDate);
    newDate.setMonth(month);
    this._selectedDate = newDate;
  }

  resetToToday() {
    this._selectedDate = new Date();
  }
}

export default new CalendarStore();
