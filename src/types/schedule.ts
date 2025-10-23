import { Lesson } from '@/features/schedule/api/service';

export interface TimeSlot {
  id: number;
  duration: string;
}

export type CardRender = (lesson: Lesson) => React.ReactNode;
