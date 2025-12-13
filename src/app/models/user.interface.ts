export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  profile_picture?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  role?: 'USER' | 'ADMIN';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  profile_picture?: string;
}
