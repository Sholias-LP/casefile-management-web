import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  Input,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { IResponse } from "../interfaces/response";
import { IResetpassword } from "../interfaces/user";
import useForm from "../utils/useForm";
import { useResetPassword } from "./api/mutations/user";

const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate, isLoading } = useResetPassword();

  const submit = async () => {
    mutate(
      { ...inputs },
      {
        onSuccess: async (response: AxiosResponse<IResponse<any>>) => {
          const { data } = response;
          setLoading(false);
          toast.success(data.message!);
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

  const { handleChange, handleSubmit, inputs } = useForm<IResetpassword>(
    {} as IResetpassword,
    submit
  );

  return (
    <AppLayout>
      <Card>
        <CardBody>
          <Heading size="hSmall" weight="w700" className="mb-30">
            Change password
          </Heading>
          <Grid md="1fr 1fr" alignItems="center">
            <form onSubmit={handleSubmit}>
              <SmallText>Enter New Password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder=""
                name="newPassword"
                onChange={handleChange}
              />
              <SmallText>Confirm New password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder=""
                name="confirmNewPassword"
                onChange={handleChange}
              />
              <Button
                fluid
                type="submit"
                disabled={loading || isLoading}
                loading={loading || isLoading}
              >
                {loading ? "" : "Save Changes"}
              </Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default ChangePassword;
