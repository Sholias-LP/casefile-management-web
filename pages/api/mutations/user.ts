import { useMutation } from "react-query";
import { Login, SignUp } from "../services/user";

const useRegister = () => useMutation(SignUp);

const useLogin = () => useMutation(Login);

export { useRegister, useLogin };
