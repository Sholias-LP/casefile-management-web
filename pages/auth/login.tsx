import { AxiosResponse, AxiosError } from "axios";
import Link from "next/link";
import router from "next/router";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Input, Button, Flex, SmallText } from "truparse-lodre";
import SvgEyeClose from "truparse-lodre/lib/icons/EyeClose";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import AuthContext from "../../context/user";
import { IResponse } from "../../interfaces/response";
import { ILogin, IUser } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import { useLogin } from "../api/mutations/user";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthAndCache, updateCurrentUser } = useContext(AuthContext);

  const { mutate, isLoading } = useLogin();

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    setLoading(true);
    mutate(
      { ...inputs },
      {
        onSuccess: async (response: AxiosResponse<IResponse<IUser>>) => {
          const { data } = response;
          setLoading(false);
          toast.success(data.message!);
          setAuthAndCache(data.data.token);
          updateCurrentUser(data.data);
          console.log(data.data);
          router.push("/");
        },
        onError: (error) => {
          const err = error as AxiosError;
          if (err.response) {
            setLoading(false);
            toast.error(err.response.data.message);
          }
        },
      }
    );
  };

  const { handleChange, handleSubmit, inputs } = useForm<ILogin>(
    {} as ILogin,
    submit
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-30">
        <Input
          placeholder="Email Address"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          trailing={
            showPassword ? (
              <SvgEyeOpen onClick={passwordVisibility} />
            ) : (
              <SvgEyeClose onClick={passwordVisibility} />
            )
          }
          name="password"
          onChange={handleChange}
        />
        <Button
          fluid
          variant="block"
          className="mt-40 mb-20"
          disabled={isLoading || loading}
          loading={isLoading || loading}
        >
          {loading ? "" : "Login"}
        </Button>
        <Flex justifyContent="center">
          <Link href="/auth/forgotPassword">
            <a>
              <SmallText weight="w600">Forgot Password?</SmallText>
            </a>
          </Link>
        </Flex>
      </div>
    </form>
  );
};

export default Login;
