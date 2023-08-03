import { FC } from 'react';
import { Grid, MerchantNavbar } from 'truparse-lodre';
import Image from 'next/image';
import Meta from '../Meta';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="authLayout">
        <MerchantNavbar sideNavSize={0}>
          <Grid
            xl="40% 60%"
            lg="40% 60%"
            md="40% 60%"
            sm="1fr"
            xs="1fr"
            gap={0}
          >
            <div className="rightSection">
              <div className="nameLogoContainer">
                <Image
                  src={'/Zentro-white.png'}
                  alt="zentro-logo"
                  width={50}
                  height={50}
                />
                <h4 style={{ color: 'white', fontSize: '30px' }}>Zentra</h4>
              </div>
              <div className="homeText">
                Empower Your Legal Team with Zentra
              </div>
              <div className="homeSubText">
                Unleash the Potential of Smart Casefile Management
              </div>
            </div>
            <div className="leftSection">
              <div className="leftContainer">{children}</div>
            </div>
          </Grid>
        </MerchantNavbar>
      </div>
    </>
  );
};

export default AuthLayout;
