import { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  Input,
  Button,
  Flex,
  SmallText,
  Card,
  CardBody,
  Grid,
  Paragraph,
} from "truparse-lodre";
import SvgEyeClose from "truparse-lodre/lib/icons/EyeClose";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import AuthLayout from "../../components/authLayout";
import AuthContext from "../../context/user";
import { IResponse } from "../../interfaces/response";
import { IForgotPassword, IUser } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import { useForgotPassword } from "../api/mutations/user";

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { updateCurrentUser } = useContext(AuthContext);
  const { mutate, isLoading } = useForgotPassword();
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    mutate(
      { ...inputs },
      {
        onSuccess: async (response: AxiosResponse<IResponse<IUser>>) => {
          const { data } = response;
          setLoading(false);
          updateCurrentUser(data.data);
          toast.success(data.message!);
          router.push("/auth/login");
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

  const { handleChange, handleSubmit, inputs } = useForm<IForgotPassword>(
    {} as IForgotPassword,
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
                RECOVER PASSWORD
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
                  type="password"
                  className="mt-5"
                  placeholder="New Password"
                  name="newPassword"
                  onChange={handleChange}
                />

                <Input
                  type="password"
                  className="mt-5"
                  placeholder="Confirm New Password"
                  name="confirmNewPassword"
                  onChange={handleChange}
                />
                <Button
                  fluid
                  variant="block"
                  className="mt-40 mb-20"
                  disabled={isLoading || loading}
                  loading={isLoading || loading}
                >
                  {loading ? "" : "Submit"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Grid>
    </AuthLayout>
  );
};

export default ForgotPassword;
