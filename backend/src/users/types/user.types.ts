import { EnglishLevel, UserRole } from '../enums';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
