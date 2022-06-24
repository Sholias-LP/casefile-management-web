import { GetUsers } from "../services/user";
import { useQuery } from "react-query";

const useGetUsers = () => useQuery("getUsers", GetUsers);

export { useGetUsers };
