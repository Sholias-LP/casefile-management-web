import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Input,
  SmallText,
} from 'truparse-lodre';
import AppLayout from '../components/appLayout';
import { IResponse } from '../interfaces/response';
import { IResetpassword } from '../interfaces/user';
import useForm from '../utils/useForm';
import { useResetPassword } from './api/mutations/user';
import ChangePasswordIcon from '../components/assets/change password.svg';
import BackNavigation from '../components/backNavigation';

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
          if (error instanceof AxiosError) {
            setLoading(false);
            toast.error(error.response?.data.message);
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
      <Flex className="mb-20">
        <BackNavigation backTo="/" />
      </Flex>
      <Card>
        <CardBody className="px-50 py-50">
          <Grid
            xl="600px"
            lg="400px"
            md="400px"
            sm="1fr"
            justifyContent="center"
            alignItems="center"
          >
            <Flex justifyContent="center">
              <ChangePasswordIcon style={{ width: '30px', height: '30px' }} />
            </Flex>
            <Flex justifyContent="center">
              <Heading size="hSmall" weight="w700" className="mb-30">
                Change password
              </Heading>
            </Flex>
            <form onSubmit={handleSubmit}>
              <SmallText>Enter New Password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder="New password"
                name="newPassword"
                onChange={handleChange}
              />
              <SmallText>Confirm New password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder="Confirm new password"
                name="confirmNewPassword"
                onChange={handleChange}
              />
              <Button
                fluid
                type="submit"
                disabled={loading || isLoading}
                loading={loading || isLoading}
              >
                {loading ? '' : 'Save Changes'}
              </Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default ChangePassword;
