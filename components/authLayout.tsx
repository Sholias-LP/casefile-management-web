import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import {
  Flex,
  Col,
  Dropdown,
  Paragraph,
  Button,
  MerchantNavbar,
} from "truparse-lodre";
import SvgHelp from "truparse-lodre/lib/icons/Help";
import SvgUser from "truparse-lodre/lib/icons/User";
import ImageComponent from "./image";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Nav = () => {
  return (
    <Flex>
      <Col>
        <Flex gap={0.5} alignItems="center">
          <Col>
            <SvgHelp width="20" height="20" />
          </Col>
          <Col>
            <Paragraph weight="w600">Help</Paragraph>
          </Col>
        </Flex>
      </Col>
    </Flex>
  );
};

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <MerchantNavbar logo={<ImageComponent />} nav={<Nav />} sideNavSize={0}>
      <div className="mt-20 mb-50 mx-20 my-20">{children}</div>
    </MerchantNavbar>
  );
};

export default AuthLayout;
