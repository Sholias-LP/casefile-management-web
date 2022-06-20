import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Card, CardBody, Grid, Paragraph } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import AuthContext from "../context/user";
import AuthView from "./auth";

const HomePage: NextPage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {!auth ? (
        <AuthView />
      ) : (
        <AppLayout>
          <Card>
            <CardBody className="pt-50 pb-50">
              <Grid xl="repeat(3, 1fr)">
                <Card bgColor="cream" className="h-100">
                  <CardBody className="h-100">
                    <Paragraph
                      className="pt-20 pb-20"
                      weight="w600"
                      size="pLarge"
                    >
                      Casefiles
                    </Paragraph>
                    <Paragraph className="pb-20" weight="w600" size="pLarge">
                      0
                    </Paragraph>
                  </CardBody>
                </Card>
                <Card bgColor="cream" className="h-100">
                  <CardBody className="h-100">
                    <Paragraph
                      className="pt-20 pb-20"
                      weight="w600"
                      size="pLarge"
                    >
                      Transactions
                    </Paragraph>
                    <Paragraph className="pb-20" weight="w600" size="pLarge">
                      0
                    </Paragraph>
                  </CardBody>
                </Card>
                <Card bgColor="cream" className="h-100">
                  <CardBody className="h-100">
                    <Paragraph
                      className="pt-20 pb-20"
                      weight="w600"
                      size="pLarge"
                    >
                      Notifications
                    </Paragraph>
                    <Paragraph className="pb-20" weight="w600" size="pLarge">
                      0
                    </Paragraph>
                  </CardBody>
                </Card>
              </Grid>
            </CardBody>
          </Card>
        </AppLayout>
      )}
    </>
  );
};

export default HomePage;
