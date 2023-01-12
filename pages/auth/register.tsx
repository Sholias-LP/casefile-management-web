import { AxiosResponse, AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  Flex,
  Input,
  Button,
  Paragraph,
  Radio,
  Checkbox,
  SmallText,
  Grid,
  Card,
  CardBody,
} from "truparse-lodre";
import SvgEyeClose from "truparse-lodre/lib/icons/EyeClose";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import AuthLayout from "../../components/authLayout";
import AuthContext from "../../context/user";
import { IResponse } from "../../interfaces/response";
import { IRegister, IUser } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import { useRegister } from "../api/mutations/user";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const { setAuthAndCache, updateCurrentUser } = useContext(AuthContext);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();

  const { mutate, isLoading } = useRegister();

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = async () => {
    setLoading(true);
    mutate(
      { ...inputs, role: role },
      {
        onSuccess: async (response: AxiosResponse<IResponse<IUser>>) => {
          const { data } = response;
          setLoading(false);
          toast.success(data.message!);
          updateCurrentUser(data.data);
          setAuthAndCache(data.data.token);
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

  const { handleChange, handleSubmit, inputs } = useForm<IRegister>(
    {} as IRegister,
    submit
  );

  return (
    <AuthLayout>
      <Grid
        xl="400px"
        lg="400px"
        md="400px"
        sm="1fr"
        justifyContent="center"
        alignItems="center"
      >
        <Card>
          <CardBody>
            <Flex justifyContent="center">
              <Paragraph weight="w600" size="pLarge">
                REGISTER
              </Paragraph>
            </Flex>
            <form onSubmit={handleSubmit}>
              <div className="mt-30">
                <Flex>
                  <Input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                  />
                </Flex>

                <Input
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
                <Input
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  trailing={
                    showPassword ? (
                      <SvgEyeOpen onClick={passwordVisibility} />
                    ) : (
                      <SvgEyeClose onClick={passwordVisibility} />
                    )
                  }
                />
                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleChange}
                  trailing={
                    showConfirmPassword ? (
                      <SvgEyeOpen onClick={confirmPasswordVisibility} />
                    ) : (
                      <SvgEyeClose onClick={confirmPasswordVisibility} />
                    )
                  }
                />

                <Paragraph className="mb-10" weight="w500">
                  Select Role
                </Paragraph>
                <Flex>
                  <Checkbox
                    label="Associate"
                    value="Associate"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "Associate"}
                  />
                  <Checkbox
                    label="Partner"
                    value="Partner"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "Partner"}
                  />
                </Flex>

                <Button
                  fluid
                  variant="block"
                  className="mt-40 mb-20"
                  disabled={loading || isLoading}
                  loading={loading || isLoading}
                >
                  {loading ? "" : "Register"}
                </Button>

                <Flex justifyContent="center">
                  <SmallText weight="w600">
                    Already have an account?{" "}
                    <Link href="/auth/login">
                      <a>Login</a>
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

export default Register;
