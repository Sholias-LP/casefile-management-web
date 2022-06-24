import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Flex,
  Grid,
  Heading,
  Input,
  Paragraph,
  ProfilePicture,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import AuthContext from "../context/user";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const userName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <AppLayout>
      <Card>
        <CardBody>
          <Heading size="hSmall" weight="w700" className="mb-30">
            Profile details
          </Heading>
          <Grid md="1fr 1fr" alignItems="center">
            <form>
              {/* <Flex alignItems="center" className="mb-30">
                <ProfilePicture
                  size={70}
                  source={currentUser.avatar}
                  state="light"
                  altText="profile-avatar"
                />

                <Col>
                  <Paragraph weight="w600">{userName.toUpperCase()}</Paragraph>
                </Col>
              </Flex> */}
              <Input type="text" placeholder="First name" name="firstName" />
              <Input type="text" placeholder="Last name" name="lastName" />
              <Input type="email" name="email" placeholder="Email" disabled />

              <Button fluid>Save Changes</Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default UserProfile;
