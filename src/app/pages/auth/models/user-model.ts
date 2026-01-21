export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface UserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
