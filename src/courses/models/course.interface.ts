export interface CourseKey {
  id: string;
}

export interface SlotConfig {
  slotId: string;
  slotQty: number;
  date: Date;
}

export interface Course extends CourseKey {
  id: string;
  courseName: string;
  categoryId: number;
  slotsConfig: [SlotConfig];
  isActive: boolean;
  imageUrl: string;
  duration: string;
  modules: number;
  description: string;
  updateAt?: string;
}
