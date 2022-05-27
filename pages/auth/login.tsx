import React, { useState } from 'react'
import { Input, Button, Flex, SmallText } from 'truparse-lodre';
import SvgEyeClose from 'truparse-lodre/lib/icons/EyeClose';
import SvgEyeOpen from 'truparse-lodre/lib/icons/EyeOpen';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <div className="mt-30">
        <Input
          placeholder="Email Address"
          type="email"
          name="email"
        />
        <Input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          trailing={
            showPassword ? (
              <SvgEyeOpen onClick={passwordVisibility} />
            ) : (
              <SvgEyeClose onClick={passwordVisibility} />
            )
          }
          name="password"
        />
        <Button
          fluid
          variant="block"
          className="mt-40 mb-20"

        >
          {'Login'}
        </Button>
        <Flex justifyContent="center">
          <SmallText weight="w600">Forgot Password?</SmallText>
        </Flex>
      </div>
    </form>
  )
}

export default Login