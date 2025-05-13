
export interface Lesson {
  time_id?: number;
  day_week?: number;
  type_lesson: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface TimeSlot {
  id: number;
  duration: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface Teacher{
  id:number
  name:string
}

export interface Room{
  id:number
  name:string
}

export interface Subject{
  id:number
  name:string
  duration:string|number
}

export type CardRender = (lesson: Lesson) => React.ReactNode;