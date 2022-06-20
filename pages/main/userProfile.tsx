import React from "react";
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
import AppLayout from "../../components/appLayout";

const UserProfile = () => {
  return (
    <AppLayout>
      <Card>
        <CardBody>
          <Heading size="hSmall" weight="w700" className="mb-30">
            Profile details
          </Heading>
          <Grid md="1fr 1fr" alignItems="center">
            <form>
              <Flex alignItems="center" className="mb-30">
                <ProfilePicture
                  size={70}
                  source={"/Profile_avatar_placeholder_large.png"}
                  state="border"
                  altText="profile-avatar"
                />

                <Col>
                  <Paragraph weight="w600">John Doe</Paragraph>
                </Col>
              </Flex>
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
