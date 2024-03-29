import { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Input,
} from 'truparse-lodre';
import AppLayout from '../components/appLayout';
import AuthContext from '../context/user';
import ProfileDetailIcon from '../components/assets/profile details.svg';
import { useUpdateUser } from './api/mutations/user';
import useForm from '../utils/useForm';
import { IUpdateUser, IUser } from '../interfaces/user';
import { AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { IResponse } from '../interfaces/response';
import BackNavigation from '../components/backNavigation';

const UserProfile = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useUpdateUser();

  const submit = async () => {
    setLoading(true);
    mutate(
      { ...inputs, _id: currentUser._id },
      {
        onSuccess: async (response: AxiosResponse<IResponse<IUser>>) => {
          const { data } = response;
          setLoading(false);
          toast.success(data.message!);
          updateCurrentUser(data.data);
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

  const { inputs, handleChange, handleSubmit } = useForm<IUpdateUser>(
    {} as IUpdateUser,
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
              <ProfileDetailIcon style={{ width: '30px', height: '30px' }} />
            </Flex>
            <Flex justifyContent="center">
              <Heading size="hSmall" weight="w700" className="mb-30">
                Profile details
              </Heading>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="First name"
                name="firstName"
                defaultValue={currentUser.first_name}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Last name"
                name="lastName"
                defaultValue={currentUser.last_name}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                disabled
                defaultValue={currentUser.email}
              />

              <Button fluid loading={loading} disabled={loading}>
                Save Changes
              </Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default UserProfile;
