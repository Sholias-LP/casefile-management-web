import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Dropdown,
  Flex,
  Img,
  MerchantNavbar,
  Navbar,
  Paragraph,
  ProfileNavItem,
} from "truparse-lodre";
import { Home, Logo } from "truparse-lodre/lib/icons";
import SvgHelp from "truparse-lodre/lib/icons/Help";
import SvgUser from "truparse-lodre/lib/icons/User";
import ImageComponent from "../pages/main/image";
import SholiasLogo from "../public/logoo.png";

interface IAppLayoutProps {
  name: string;
  pathName: string;
  icon: JSX.Element;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayoutNavigation: IAppLayoutProps[] = [
  {
    name: "Dashboard",
    pathName: "/",
    icon: <Home />,
  },
  {
    name: "CaseFiles",
    pathName: "/main/casefiles",
    icon: <Home />,
  },
  {
    name: "Transactions",
    pathName: "/main/transactions",
    icon: <Home />,
  },
];

const NavItems = () => {
  const query = useRouter();
  return (
    <Card>
      <ul>
        {AppLayoutNavigation.map((item: IAppLayoutProps, index: number) => (
          <>
            <Link href={item.pathName} key={index}>
              <a href={item.pathName}>
                <ProfileNavItem
                  active={item.pathName === query.pathname}
                  icon={item.icon}
                >
                  {item.name}
                </ProfileNavItem>
              </a>
            </Link>
          </>
        ))}
        <Link href="">
          <a>
            <ProfileNavItem>
              <Paragraph>Logout</Paragraph>
            </ProfileNavItem>
          </a>
        </Link>
      </ul>
    </Card>
  );
};

const Nav = () => {
  const query = useRouter();
  return (
    <Flex>
      <Col>
        <Flex gap={0.5} alignItems="center">
          {query.pathname === "/auth" ? (
            <></>
          ) : (
            <Col>
              <Dropdown
                buttonChildren={
                  <Flex alignItems="center">
                    <SvgUser height={24} width={24} />
                    <Paragraph weight="w500">My Account</Paragraph>
                  </Flex>
                }
                width={350}
              >
                <Flex>
                  <Link href="/auth">
                    <Button fluid size="small">
                      Register
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button fluid size="small">
                      Login
                    </Button>
                  </Link>
                </Flex>

              </Dropdown>
            </Col>
          )}

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

const AppLayout: FC<IProps> = ({ children }) => {
  const query = useRouter();
  return (
    <MerchantNavbar
      logo={<ImageComponent />}
      nav={<Nav />}
      sideNavSize={query.asPath.includes("/auth") ? 0 : 250}
      navChildren={<NavItems />}
    >
      <div className="mt-20 mb-50 mx-20 my-20">{children}</div>
    </MerchantNavbar>
  );
};

export default AppLayout;
