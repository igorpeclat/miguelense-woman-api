import { Schema } from 'dynamoose';

export const ScheduleSchema = new Schema(
  {
    id: String,
    courseId: String,
    userId: {
      type: String,
      index: {
        name: 'userId-index',
        type: 'global',
      }
    },
    slotId: String,
    isActive: Boolean,
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
);
