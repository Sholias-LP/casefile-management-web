import type { NextPage } from "next";
import Link from "next/link";
import { Card, CardBody, Flex, Grid, Paragraph } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetTransactions } from "./api/queries/transactions";
import { useGetUsers } from "./api/queries/users";
import TeamIcon from "../components/assets/team.svg";
import CaseFileIcon from "../components/assets/case files.svg";
import TransactionIcon from "../components/assets/transaction.svg";

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
                <Card bgColor="cream" className="h-100 cardHover">
                  <CardBody className="h-100">
                    <Flex alignItems="center" justifyContent="space-between">
                      <div>
                        <Paragraph
                          className="pt-20 pb-20"
                          weight="w600"
                          size="pLarge"
                        >
                          Team
                        </Paragraph>
                        <Paragraph
                          className="pb-20"
                          weight="w600"
                          size="hLarge"
                        >
                          {users.data?.data.count || 0}
                        </Paragraph>
                      </div>
                      <TeamIcon style={{ width: "100px", height: "100px" }} />
                    </Flex>
                  </CardBody>
                </Card>
              </a>
            </Link>

            <Link href="/casefiles">
              <a>
                <Card bgColor="cream" className="h-100 cardHover">
                  <CardBody className="h-100">
                    <Flex alignItems="center" justifyContent="space-between">
                      <div>
                        <Paragraph
                          className="pt-20 pb-20"
                          weight="w600"
                          size="pLarge"
                        >
                          Casefiles
                        </Paragraph>
                        <Paragraph
                          className="pb-20"
                          weight="w600"
                          size="hLarge"
                        >
                          {casefiles.data?.data.count || 0}
                        </Paragraph>
                      </div>
                      <CaseFileIcon
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Flex>
                  </CardBody>
                </Card>
              </a>
            </Link>

            <Link href="/transactions">
              <a>
                <Card bgColor="cream" className="h-100 cardHover">
                  <CardBody className="h-100">
                    <Flex alignItems="center" justifyContent="space-between">
                      <div>
                        <Paragraph
                          className="pt-20 pb-20"
                          weight="w600"
                          size="pLarge"
                        >
                          Transactions
                        </Paragraph>
                        <Paragraph
                          className="pb-20"
                          weight="w600"
                          size="hLarge"
                        >
                          {transactions.data?.data.count || 0}
                        </Paragraph>
                      </div>
                      <TransactionIcon
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Flex>
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
