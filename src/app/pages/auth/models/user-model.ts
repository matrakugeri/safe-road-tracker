export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UserResponse {
  data: User;
  token: string;
  status: string;
}

export interface UserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
