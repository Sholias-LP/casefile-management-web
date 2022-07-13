import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { IResponse } from "../interfaces/response";
import Axios from "./api/services/axios";
import { GetNotifications } from "./api/services/user";

const Notifications = () => {
  const data = async () => {
    const res = await GetNotifications();
    console.log(res);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <AppLayout>
      {Array(6)
        .fill(0)
        .map((item: any, index: number) => (
          <Card className="mb-10" key={index}>
            <CardBody>Janet sent you a message</CardBody>
          </Card>
        ))}
    </AppLayout>
  );
};

export default Notifications;
