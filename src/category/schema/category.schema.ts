import { Schema } from "dynamoose";

export const CategorySchema = new Schema(
  {
    id: String,
    name: String,
    imageUrl: String,
    isActive: Boolean,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
