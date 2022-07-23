import { AxiosResponse } from "axios";
import { IResponse } from "../../../interfaces/response";
import {
  INotificationResponse,
  IReadNotification,
} from "../../../interfaces/user";
import Axios from "./axios";

const GetNotifications = async () => {
  const res: AxiosResponse<IResponse<INotificationResponse[]>> =
    await Axios.get("/notifications");
  return res;
};

const ReadNotification = async (payload: IReadNotification) => {
  const res: AxiosResponse<IResponse<INotificationResponse>> =
    await Axios.patch(`/notifications/read`, payload);
  return res;
};

const UnReadNotification = async (payload: IReadNotification) => {
  const res: AxiosResponse<IResponse<INotificationResponse>> =
    await Axios.patch(`/notifications/unread`, payload);
  return res;
};

const DeleteNotification = async (notificationIds: string[]) => {
  const res: AxiosResponse<IResponse> = await Axios.delete(
    "/notifications/delete",
    { data: { notificationIds } }
  );
  return res;
};

export {
  GetNotifications,
  ReadNotification,
  UnReadNotification,
  DeleteNotification,
};
