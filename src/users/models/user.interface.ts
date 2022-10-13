export interface UserKey {
  id: string;
}

export interface User extends UserKey {
  id: string;
  fullName: string;
  email: string;
  birthdayDate: string;
  zipCode: string;
  password: string;
  role: string;
  isActive: boolean;
}
