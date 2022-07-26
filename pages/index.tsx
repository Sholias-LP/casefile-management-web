import type { NextPage } from "next";
import Link from "next/link";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetTransactions } from "./api/queries/transactions";
import { useGetUsers } from "./api/queries/users";
import TeamIcon from "../components/assets/team.svg";
import CaseFileIcon from "../components/assets/case files.svg";
import TransactionIcon from "../components/assets/transaction.svg";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";
import { useEffect, useState } from "react";
import { INotificationResponse, IUser } from "../interfaces/user";
import { GetNotifications } from "./api/services/notifications";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

const HomePage: NextPage = () => {
  const [notificationData, setNotificationdata] = useState<
    INotificationResponse[]
  >([]);

  Chart.register(ArcElement);

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const casefiles = useGetCaseFiles();
  const users = useGetUsers();
  const transactions = useGetTransactions();

  const data = async () => {
    const res = await GetNotifications();
    setNotificationdata(res.data.data);
  };

  const state = {
    labels: ["Casefiles", "Transactions"],
    datasets: [
      {
        label: "User Count",
        backgroundColor: ["#FB1919", "#F97034"],
        hoverBackgroundColor: ["#F70404", "#FF502D"],
        data: [casefiles.data?.data.count, transactions.data?.data.count],
      },
    ],
  };

  useEffect(() => {
    data();
  }, []);

  const recentActivities = notificationData && notificationData.slice(0, 4);

  return (
    <AppLayout>
      <Card className="mb-30">
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
      <Grid xl="2fr 1fr" lg="1fr" md="1fr">
        <Card>
          <CardBody>
            <Paragraph className="mb-20" weight="w600">
              Recent Activities
            </Paragraph>
            <>
              {recentActivities &&
                recentActivities.map(
                  (item: INotificationResponse, index: number) => (
                    <Card
                      bgColor="cream"
                      className="mb-10"
                      key={index}
                      style={{ cursor: "pointer" }}
                    >
                      <CardBody>
                        <Grid
                          xl="1fr auto"
                          lg="1fr auto"
                          md="1fr auto"
                          sm="1fr auto"
                          xs="1fr auto"
                        >
                          <Flex gap={0.2}>
                            <SmallText>{item.user}</SmallText>
                            <SmallText>{item.activity}</SmallText>
                          </Flex>
                          <Flex justifyContent="end">
                            <SmallText>{timeAgo.format(item.date)}</SmallText>
                          </Flex>
                        </Grid>
                      </CardBody>
                    </Card>
                  )
                )}
            </>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Pie data={state} style={{ width: "50px", height: "50px" }} />
          </CardBody>
        </Card>
      </Grid>
    </AppLayout>
  );
};

export default HomePage;
