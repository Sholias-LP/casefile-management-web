import { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Input,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import AuthContext from "../context/user";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <AppLayout>
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
              <Heading size="hSmall" weight="w700" className="mb-30">
                Profile details
              </Heading>
            </Flex>

            <form>
              <Input
                type="text"
                placeholder="First name"
                name="firstName"
                defaultValue={currentUser.first_name}
              />
              <Input
                type="text"
                placeholder="Last name"
                name="lastName"
                defaultValue={currentUser.last_name}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                disabled
                defaultValue={currentUser.email}
              />

              <Button fluid>Save Changes</Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default UserProfile;
