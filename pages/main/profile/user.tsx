import React from "react";
import { Button, Flex, Input, ProfilePicture, SmallText } from "truparse-lodre";

const UserProfile = () => {
  return (
    <>
      <Flex justifyContent="center" className="mb-20">
        <ProfilePicture
          source="/Profile_avatar_placeholder_large.png"
          size={70}
          altText="avatar"
          state="cream"
        />
      </Flex>
      <SmallText weight="w500">First Name</SmallText>
      <Input placeholder="" type="text" className="mt-10" />
      <SmallText weight="w500">Last Name</SmallText>
      <Input placeholder="" type="text" className="mt-10" />
      <SmallText weight="w500">Email</SmallText>
      <Input placeholder="" type="text" className="mt-10" disabled />
      <SmallText weight="w500">Phone Number</SmallText>
      <Input placeholder="" type="phone" className="mt-10" />
      <Flex justifyContent="end" className="mt-10">
        <Button>Save</Button>
      </Flex>
    </>
  );
};

export default UserProfile;
