import { AxiosResponse } from "axios";
import { IResponse } from "../../../interfaces/response";
import {
  ILogin,
  IRegister,
  IResetpassword,
  IUser,
} from "../../../interfaces/user";
import Axios from "./axios";

const SignUp = async (payload: IRegister) => {
  const res: AxiosResponse<IResponse<IUser>> = await Axios.post(
    "/auth/register",
    payload
  );
  return res;
};

const Login = async (payload: ILogin) => {
  const res: AxiosResponse<IResponse<IUser>> = await Axios.post(
    "/auth/signin",
    payload
  );
  return res;
};

const ResetPassword = async (payload: IResetpassword) => {
  const res: AxiosResponse<IResponse<any>> = await Axios.put(
    "/auth/resetpassword",
    payload
  );
  return res;
};

const GetUsers = async () => {
  const res: AxiosResponse<IResponse<any>> = await Axios.get("/users");
  return res;
};

export { SignUp, Login, ResetPassword, GetUsers };
