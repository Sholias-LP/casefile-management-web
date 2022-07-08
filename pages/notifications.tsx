import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import { IResponse } from "../interfaces/response";
import { GetNotifications } from "./api/services/user";

const Notifications = () => {
  // const [popNotifications, setPopNotifications] =
  //   useState<AxiosResponse<IResponse>>();

  // useEffect(() => {
  //   try {
  //     const res = GetNotifications();
  //     console.log(res);
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     toast.error(err.message);
  //   }
  // }, []);

  // console.log(popNotifications);

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
