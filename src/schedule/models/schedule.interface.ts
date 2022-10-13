export interface ScheduleKey {
  id: string;
}

export interface Schedule extends ScheduleKey {
  id: string;
  courseId: string;
  userId: string;
  slotId: string;
  isActive: boolean;
}