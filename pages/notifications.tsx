import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { ITransactionsResponse } from "../interfaces/transactions";
import { INotificationResponse } from "../interfaces/user";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetTransactions } from "./api/queries/transactions";
import { GetNotifications } from "./api/services/user";

const Notifications = () => {
  const router = useRouter();
  const { data: casefiles } = useGetCaseFiles();
  const { data: transactions } = useGetTransactions();
  const [notificationData, setNotificationdata] = useState<
    INotificationResponse[]
  >([]);
  const [clickedItem, setItem] = useState<string>("");

  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const data = async () => {
    const res = await GetNotifications();
    setNotificationdata(res.data.data);
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    if (clickedItem) {
      transactions?.data.data.map((item: ITransactionsResponse) => {
        if (clickedItem === item._id) {
          router.push(`/transactions/${clickedItem}`);
        }
      });
      casefiles?.data.data.map((item: ICasefilesResponse) => {
        if (clickedItem === item._id) {
          router.push(`/casefiles/${clickedItem}`);
        }
      });
    }
  }, [clickedItem]);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    console.log(name);
  };

  return (
    <AppLayout>
      <Card bgColor="grey">
        <CardBody>
          <div style={{ alignItems: "center", display: "flex" }}>
            <input type="checkbox" />
            <label style={{ fontSize: "12px", marginLeft: "5px" }}>
              Select All
            </label>
          </div>
        </CardBody>
      </Card>
      <Divider />
      <>
        {notificationData &&
          notificationData.map((item: INotificationResponse, index: number) => (
            <>
              <Card
                bgColor={item.status === "unread" ? "light" : "cream"}
                key={index}
                style={{
                  borderLeft:
                    item.status === "unread" ? "" : "4px solid #FFC20E",
                }}
              >
                <Grid
                  xl="30px 1fr"
                  lg="30px 1fr"
                  md="30px 1fr"
                  sm="15px 1fr"
                  xs="15px 1fr"
                >
                  <CardBody>
                    <div>
                      <input
                        type="checkbox"
                        value={item._id}
                        name={item._id}
                        onChange={handleCheckBoxChange}
                      />
                    </div>
                  </CardBody>
                  <CardBody
                    onClick={() => setItem(item.resourceId)}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid
                      xl="1fr auto"
                      lg="1fr auto"
                      md="1fr auto"
                      sm="1fr auto"
                      xs="1fr auto"
                    >
                      <Flex gap={0.2}>
                        <SmallText
                          onClick={() => router.push(`/team/${item.userId}`)}
                          weight={"w600"}
                        >
                          {item.user}
                        </SmallText>
                        <SmallText>{item.activity}</SmallText>
                      </Flex>
                      <Flex justifyContent="end">
                        <SmallText>{timeAgo.format(item.date)}</SmallText>
                      </Flex>
                    </Grid>
                  </CardBody>
                </Grid>
              </Card>
              <Divider />
            </>
          ))}
      </>
    </AppLayout>
  );
};

export default Notifications;
