import React from "react";
import { Button, Flex, Input, Paragraph } from "truparse-lodre";

const ChangePassword = () => {
  return (
    <>
      <Input placeholder="Old Password" type="password" />
      <Input placeholder="New Password" type="password" />

      <Flex justifyContent="end" className="mt-10">
        <Button>Save</Button>
      </Flex>
    </>
  );
};

export default ChangePassword;
