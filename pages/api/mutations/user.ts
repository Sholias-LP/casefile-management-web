import { useMutation } from "react-query";
import { Login, ResetPassword, SignUp } from "../services/user";

const useRegister = () => useMutation(SignUp);

const useLogin = () => useMutation(Login);

const useResetPassword = () => useMutation(ResetPassword);

export { useRegister, useLogin, useResetPassword };
