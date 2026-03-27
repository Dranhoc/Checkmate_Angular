import { Gender } from '@core/enums/gender.enum';

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface UserData extends User {
  pseudo: string;
  birthDate: Date;
  gender: Gender;
  elo: number;
}
