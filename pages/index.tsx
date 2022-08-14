import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { LoaderIcon } from "react-hot-toast";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import CaseFileIcon from "../components/assets/case files.svg";
import NotificationIcon from "../components/assets/notification.svg";
import TeamIcon from "../components/assets/team.svg";
import TransactionIcon from "../components/assets/transaction.svg";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { ITransactionsResponse } from "../interfaces/transactions";
import { INotificationResponse } from "../interfaces/user";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetNofications } from "./api/queries/notification";
import { useGetTransactions } from "./api/queries/transactions";
import { useGetUsers } from "./api/queries/users";

const HomePage: NextPage = () => {
  const { data: notificationData, isLoading } = useGetNofications();
  const [clickedItem, setItem] = useState<string>("");
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<number>(-1);

  const handleMouseEnter = (index: number) => {
    setIsHovering(index);
  };

  const handleMouseLeave = () => {
    setIsHovering(-1);
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const casefiles = useGetCaseFiles();
  const users = useGetUsers();
  const transactions = useGetTransactions();

  const state = {
    labels: ["Case files", "Transactions"],
    datasets: [
      {
        label: "User Count",
        backgroundColor: ["rgba(255, 194, 14, 0.6)", "rgba(255, 194, 14, 0.3)"],
        hoverBackgroundColor: [
          "rgba(255, 194, 14, 0.7)",
          "rgba(255, 194, 14, 0.4)",
        ],
        data: [casefiles.data?.data.count, transactions.data?.data.count],
      },
    ],
  };

  useEffect(() => {
    if (clickedItem) {
      transactions.data?.data.data.map((item: ITransactionsResponse) => {
        if (clickedItem === item._id) {
          router.push(`/transactions/${clickedItem}`);
        }
      });
      casefiles.data?.data.data.map((item: ICasefilesResponse) => {
        if (clickedItem === item._id) {
          router.push(`/casefiles/${clickedItem}`);
        }
      });
    }
  }, [clickedItem, casefiles, transactions, router]);

  const recentActivities =
    notificationData && notificationData.data.data.slice(0, 4);

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
                          Case files
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
              {isLoading ? (
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex justifyContent="center">
                      <LoaderIcon style={{ width: "100px", height: "100px" }} />
                    </Flex>
                  </CardBody>
                </Card>
              ) : recentActivities && recentActivities.length > 0 ? (
                recentActivities.map(
                  (item: INotificationResponse, index: number) => (
                    <Card
                      bgColor="cream"
                      className="mb-10 h-100"
                      key={index}
                      onClick={() => setItem(item.resourceId)}
                      style={{
                        borderLeft:
                          isHovering === index ? "4px solid #fffaeb" : "",
                        transition: "all .8sec ease-in-out",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
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
                )
              ) : (
                <Card className="h-100">
                  <CardBody className="h-100 pt-50 pb-50">
                    <Flex justifyContent="center">
                      <NotificationIcon
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      <Paragraph weight="w600">No Notifications yet</Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
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
