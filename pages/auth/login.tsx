import { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import router from 'next/router';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Input,
  Paragraph,
  SmallText,
} from 'truparse-lodre';
import SvgEyeClose from 'truparse-lodre/lib/icons/EyeClose';
import SvgEyeOpen from 'truparse-lodre/lib/icons/EyeOpen';
import AuthContext from '../../context/user';
import { IResponse } from '../../interfaces/response';
import { ILogin, IUser } from '../../interfaces/user';
import { H } from '@highlight-run/next/client';
import useForm from '../../utils/useForm';
import { useLogin } from '../api/mutations/user';
import AuthLayout from '../../components/authLayout';

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
          H.identify(`${data.data.first_name} ${data.data.last_name}`, {
            id: data.data._id,
            email: data.data.email,
            role: data.data.role,
          });
          setLoading(false);
          toast.success(data.message!);
          setAuthAndCache(data.data.token);
          updateCurrentUser(data.data);
          router.push('/');
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data.message);
          } else {
            setLoading(false);
            toast.error(`${error}`);
            console.log(error);
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
      <Grid
        xl="400px"
        lg="400px"
        md="400px"
        sm="500px"
        xs="1fr"
        justifyContent="center"
      >
        <div className="formContainer">
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
                type={showPassword ? 'text' : 'password'}
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
                {loading ? '' : 'Login'}
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
        </div>
      </Grid>
    </AuthLayout>
  );
};

export default Login;
