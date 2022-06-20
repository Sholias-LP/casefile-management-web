import { AxiosResponse } from "axios";
import { IResponse } from "../../../interfaces/response";
import { ILogin, IRegister, IUser } from "../../../interfaces/user";
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

export { SignUp, Login };
