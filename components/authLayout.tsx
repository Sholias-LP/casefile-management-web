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
  Grid,
} from "truparse-lodre";
import SvgHelp from "truparse-lodre/lib/icons/Help";
import SvgUser from "truparse-lodre/lib/icons/User";
import ImageComponent from "./image";
import Meta from "./Meta";

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
    <>
      <Meta />
      <div className="authLayout">
        <MerchantNavbar sideNavSize={0}>
          <Grid xl="1fr 1fr" lg="1fr 1fr" md="1fr">
            <div className="rightSection">
              <div className="homeText">
                Manage legal cases and transactions; all in one place.
              </div>
            </div>
            <div className="leftSection">{children}</div>
          </Grid>
        </MerchantNavbar>
      </div>
    </>
  );
};

export default AuthLayout;
