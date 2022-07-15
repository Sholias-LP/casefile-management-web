import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, CardBody, Paragraph } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { ITransactionsResponse } from "../interfaces/transactions";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetTransactions } from "./api/queries/transactions";
import { GetNotifications } from "./api/services/user";

const Notifications = () => {
  const router = useRouter();
  const { data: casefiles } = useGetCaseFiles();
  const { data: transactions } = useGetTransactions();

  const [notificationData, setNotificationdata] = useState<any>();
  const [transactionData, setTransactionData] =
    useState<ITransactionsResponse>();
  const [casefileData, setCasefileData] = useState<ICasefilesResponse>();

  const [item, setItem] = useState<string>("");
  const [id, setId] = useState<string>("");

  const data = async () => {
    const res = await GetNotifications();
    setNotificationdata(res.data.data);
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    if (transactions) {
      transactions?.data.data.map((item: ITransactionsResponse) => {
        setTransactionData(item);
      });
    }
  }, []);

  useEffect(() => {
    if (casefiles) {
      casefiles?.data.data.map((item: ICasefilesResponse) => {
        setCasefileData(item);
      });
    }
  }, []);

  useEffect(() => {
    if (notificationData) {
      notificationData.map((notification: string) => {
        if (item === notification) {
          const result = notification.split(" ")[7];
          if (result === transactionData?._id) {
            router.push(`/transactions/${result}`);
          }
          if (result === casefileData?._id) {
            router.push(`/casefiles/${result}`);
          }
        }
      });
    }
  }, [item]);

  // useEffect(() => {
  //   if (notificationData) {
  //     notificationData.map((notification: string) => {
  //       if (item === notification) {
  //         const result = notification.split(" ")[1].slice(1, 25);
  //         router.push(`/team/${result}`);
  //       }
  //     });
  //   }
  // }, [item]);

  return (
    <AppLayout>
      {notificationData &&
        notificationData.map((item: string, index: number) => (
          <Card
            className="mb-10"
            key={index}
            onClick={() => {
              setItem(item);
            }}
            style={{ cursor: "pointer" }}
          >
            <CardBody>
              <Paragraph>{item}</Paragraph>
            </CardBody>
          </Card>
        ))}
    </AppLayout>
  );
};

export default Notifications;
