export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  confirmPassword: string;
  token: string;
  role: string;
}

export interface IResetpassword {
  newPassword: string;
  confirmNewPassword: string;
}
