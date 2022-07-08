import type { NextPage } from "next";
import Link from "next/link";
import { Card, CardBody, Grid, Paragraph } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetTransactions } from "./api/queries/transactions";
import { useGetUsers } from "./api/queries/users";

const HomePage: NextPage = () => {
  const casefiles = useGetCaseFiles();
  const users = useGetUsers();
  const transactions = useGetTransactions();

  return (
    <AppLayout>
      <Card>
        <CardBody className="pt-50 pb-50">
          <Grid xl="repeat(3, 1fr)">
            <Link href="/team">
              <a>
                <Card bgColor="cream" className="h-100">
                  <CardBody className="h-100">
                    <Paragraph
                      className="pt-20 pb-20"
                      weight="w600"
                      size="pLarge"
                    >
                      Members
                    </Paragraph>
                    <Paragraph className="pb-20" weight="w600" size="pLarge">
                      {users.data?.data.count || 0}
                    </Paragraph>
                  </CardBody>
                </Card>
              </a>
            </Link>

            <Link href="/casefiles">
              <a>
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
                      {casefiles.data?.data.count || 0}
                    </Paragraph>
                  </CardBody>
                </Card>
              </a>
            </Link>

            <Link href="/transactions">
              <a>
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
                      {transactions.data?.data.count || 0}
                    </Paragraph>
                  </CardBody>
                </Card>
              </a>
            </Link>
          </Grid>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default HomePage;
