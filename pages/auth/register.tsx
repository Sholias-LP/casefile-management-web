import React, { useState } from "react";
import { Flex, Input, Button, Paragraph, Radio, Checkbox } from "truparse-lodre";
import SvgEyeClose from "truparse-lodre/lib/icons/EyeClose";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form>
      <div className="mt-30">
        <Flex>
          <Input placeholder="First Name" type="text" name="firstName" />
          <Input placeholder="Last Name" type="text" name="lastName" />
        </Flex>

        <Input placeholder="Email Address" type="email" name="email" />
        <Input placeholder="Phone Number" type="tel" name="phone" />
        <Input
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          trailing={
            showPassword ? (
              <SvgEyeOpen onClick={passwordVisibility} />
            ) : (
              <SvgEyeClose onClick={passwordVisibility} />
            )
          }
        />
        <Input
          placeholder="Confirm Password"
          name="password"
          type={showConfirmPassword ? "text" : "password"}
          trailing={
            showConfirmPassword ? (
              <SvgEyeOpen onClick={confirmPasswordVisibility} />
            ) : (
              <SvgEyeClose onClick={confirmPasswordVisibility} />
            )
          }
        />

        <Paragraph className="mb-10" weight="w500">Select Role</Paragraph>
        <Flex>
          <Checkbox label="Associate" />
          <Checkbox label="Partner" />
        </Flex>

        <Button fluid variant="block" className="mt-40 mb-20">
          {"Register"}
        </Button>
      </div>
    </form>
  );
};

export default Register;
