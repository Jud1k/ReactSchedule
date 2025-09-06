import { Lesson } from "@/schemas";

export interface TimeSlot {
  id: number;
  duration: string;
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
