import { ICasefile, ICasefilesResponse } from "./casefiles";
import { ITransactionsResponse } from "./transactions";

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
  _id: string;
}

export interface IResetpassword {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IForgotPassword {
  newPassword: string;
  confirmNewPassword: string;
  email: string;
}

export interface IResources {
  casefiles: ICasefilesResponse[];
  transactions: ITransactionsResponse[];
}

export interface IResourceTypes {
  casefiles: ICasefileTypes[];
  transactions: ITransactionTypes[];
}

export interface ICasefileTypes {
  name: string;
  slug: string;
  type: string;
}

export interface ITransactionTypes {
  name: string;
  slug: string;
  type: string;
}
