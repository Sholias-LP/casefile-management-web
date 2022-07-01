import { AxiosResponse } from "axios";
import { IResponse } from "../../../interfaces/response";
import {
  ILogin,
  IRegister,
  IResetpassword,
  IResources,
  IResourceTypes,
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

const GetUserResources = async (id: string) => {
  const res: AxiosResponse<IResponse<IResources>> = await Axios.get(
    `/users/${id}/resources`
  );
  return res;
};

const GetResourceTypes = async () => {
  const res: AxiosResponse<IResponse<IResourceTypes>> = await Axios.get(
    "/resourcecategory"
  );
  return res;
};

export {
  SignUp,
  Login,
  ResetPassword,
  GetUsers,
  GetUserResources,
  GetResourceTypes,
};
