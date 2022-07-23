import { useQuery } from "react-query";
import { GetNotifications } from "../services/notifications";

const useGetNofications = () => useQuery("getNotifications", GetNotifications);

export { useGetNofications };
