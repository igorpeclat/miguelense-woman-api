import { Schema } from 'dynamoose';

export const UserSchema = new Schema(
  {
    id: String,
    fullName: String,
    email: String,
    birthdayDate: String,
    zipCode: String,
    password: String,
    role: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
