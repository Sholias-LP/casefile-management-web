import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
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
  ProfilePicture,
} from "truparse-lodre";
import { Home, Logo } from "truparse-lodre/lib/icons";
import SvgHelp from "truparse-lodre/lib/icons/Help";
import SvgUser from "truparse-lodre/lib/icons/User";
import AuthContext, { setLogout } from "../context/user";
import ImageComponent from "./image";
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
    pathName: "/casefiles",
    icon: <Home />,
  },
  {
    name: "Transactions",
    pathName: "/transactions",
    icon: <Home />,
  },
  {
    name: "Notifications",
    pathName: "/notifications",
    icon: <Home />,
  },
  {
    name: "Team",
    pathName: "/team",
    icon: <Home />,
  },
  {
    name: "Profile Details",
    pathName: "/userProfile",
    icon: <Home />,
  },
  {
    name: "Change Password",
    pathName: "/changePassword",
    icon: <Home />,
  },
];

const NavItems = () => {
  const query = useRouter();
  const handleLogOut = () => {
    setLogout("/auth");
  };
  return (
    <Card>
      <div>
        {AppLayoutNavigation.map((item: IAppLayoutProps, index: number) => (
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
        ))}
        <Link href="/auth">
          <a onClick={handleLogOut}>
            <ProfileNavItem>Logout</ProfileNavItem>
          </a>
        </Link>
      </div>
    </Card>
  );
};

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const userName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <Flex>
      <Col>
        <Flex gap={1.5} alignItems="center">
          <Col>
            <ProfilePicture
              source={currentUser.avatar}
              size={50}
              state="light"
              altText="profile"
            />
          </Col>

          <Col>
            <Paragraph weight="w600" size="pLarge">
              {userName.toUpperCase()}
            </Paragraph>
          </Col>
        </Flex>
      </Col>
    </Flex>
  );
};

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <MerchantNavbar
      logo={<ImageComponent />}
      nav={<Nav />}
      sideNavSize={250}
      navChildren={<NavItems />}
    >
      <div className="mt-20 mb-50 mx-20 my-20">{children}</div>
    </MerchantNavbar>
  );
};

export default AppLayout;
