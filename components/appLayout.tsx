import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import {
  Card,
  Col,
  Divider,
  Flex,
  MerchantNavbar,
  Paragraph,
  ProfileNavItem,
  ProfilePicture,
} from "truparse-lodre";
import { Home } from "truparse-lodre/lib/icons";
import AuthContext, { setLogout } from "../context/user";
import ImageComponent from "./image";
import protectedRoute from "../pages/api/protectedRoute";
import DashboardIcon from "../components/assets/dashboard.svg";
import CaseFileIcon from "../components/assets/case files.svg";
import TransactionIcon from "../components/assets/transaction.svg";
import NotificationIcon from "../components/assets/notification.svg";
import TeamIcon from "../components/assets/team.svg";
import LogoutIcon from "../components/assets/logout.svg";
import ChangePasswordIcon from "../components/assets/change password.svg";
import ProfileDetailIcon from "../components/assets/profile details.svg";
import { captalize } from "../utils/nameConverter";
import { useGetNofications } from "../pages/api/queries/notification";

interface IAppLayoutProps {
  name: string;
  pathName: string;
  icon: SVGElement | JSX.Element;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayoutNavigation: IAppLayoutProps[] = [
  {
    name: "Dashboard",
    pathName: "/",
    icon: <DashboardIcon />,
  },
  {
    name: "Case files",
    pathName: "/casefiles",
    icon: <CaseFileIcon />,
  },
  {
    name: "Transactions",
    pathName: "/transactions",
    icon: <TransactionIcon />,
  },
  {
    name: "Notifications",
    pathName: "/notifications",
    icon: <NotificationIcon />,
  },
  {
    name: "Team",
    pathName: "/team",
    icon: <TeamIcon />,
  },
];

const NavLayout: IAppLayoutProps[] = [
  {
    name: "Profile details",
    pathName: "/userProfile",
    icon: <ProfileDetailIcon />,
  },
  {
    name: "Change password",
    pathName: "/changePassword",
    icon: <ChangePasswordIcon />,
  },
];

const NavItems = () => {
  const query = useRouter();
  const handleLogOut = () => {
    setLogout("/auth");
  };
  const { data } = useGetNofications();

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
                {item.name === "Notifications" ? (
                  <div className="cartContainer">
                    <div>{item.name}</div>
                    <div className="badge">{data?.data.unread}</div>
                  </div>
                ) : (
                  item.name
                )}
              </ProfileNavItem>
            </a>
          </Link>
        ))}
        <Divider />
        {NavLayout.map((item: IAppLayoutProps, index: number) => (
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
        <Divider />
        <Link href="/auth">
          <a onClick={handleLogOut}>
            <ProfileNavItem icon={<LogoutIcon />}>Logout</ProfileNavItem>
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
              {captalize(userName)}
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

export default protectedRoute(AppLayout);
