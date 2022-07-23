import { useMutation } from "react-query";
import {
  DeleteNotification,
  ReadNotification,
  UnReadNotification,
} from "../services/notifications";

const useReadNotifications = () => useMutation(ReadNotification);

const useUnReadNotifications = () => useMutation(UnReadNotification);

const useDeleteNotifications = () => useMutation(DeleteNotification);

export { useReadNotifications, useUnReadNotifications, useDeleteNotifications };
