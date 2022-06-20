import React from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Input,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../../components/appLayout";

const ChangePassword = () => {
  return (
    <AppLayout>
      <Card>
        <CardBody>
          <Heading size="hSmall" weight="w700" className="mb-30">
            Change password
          </Heading>
          <Grid md="1fr 1fr" alignItems="center">
            <form>
              <SmallText>Enter Old Password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder=""
                name="password"
              />
              <SmallText>New password</SmallText>
              <Input
                type="password"
                className="mt-5"
                placeholder=""
                name="newPassword"
              />
              <Button fluid>Save Changes</Button>
            </form>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default ChangePassword;
