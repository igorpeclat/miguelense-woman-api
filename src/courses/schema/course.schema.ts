import { Schema } from "dynamoose";

const slotSchema = new Schema({
  slotId: String,
  slotQty: Number,
  date: String,
});

export const CourseSchema = new Schema(
  {
    id: {
      type: String,
    },
    courseName: String,
    categoryId: Number,
    slotsConfig: {
      type: Array,
      schema: [slotSchema],
    },

    isActive: Boolean,
    imageUrl: String,
    duration: String,
    modules: Number,
    description: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
