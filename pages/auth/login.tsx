import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import router from "next/router";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Input,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import SvgEyeClose from "truparse-lodre/lib/icons/EyeClose";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import AuthLayout from "../../components/authLayout";
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
          router.push("/");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setLoading(false);
            toast.error(error.response?.data.message);
          } else {
            setLoading(false);
            toast.error(`${error}`);
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
    <AuthLayout>
      <Grid xl="400px" lg="400px" md="400px" sm="1fr" justifyContent="center">
        <Card>
          <CardBody>
            <Flex justifyContent="center">
              <Paragraph weight="w600" size="pLarge">
                LOGIN
              </Paragraph>
            </Flex>

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
                <Flex justifyContent="center" className="mt-10">
                  <SmallText weight="w600">
                    Don&apos;t have an account?
                    <Link href="/auth/register">
                      <a> Sign Up</a>
                    </Link>
                  </SmallText>
                </Flex>
              </div>
            </form>
          </CardBody>
        </Card>
      </Grid>
    </AuthLayout>
  );
};

export default Login;
