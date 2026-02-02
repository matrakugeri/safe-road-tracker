export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}

export interface UserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
