import { JwtPayload } from 'jwt-decode';

export interface LoginResponse {
  token: string;
}

export interface JwtDecoded extends JwtPayload {
  isAdmin: boolean;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
