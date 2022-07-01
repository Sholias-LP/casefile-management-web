import { GetResourceTypes, GetUserResources, GetUsers } from "../services/user";
import { useQuery } from "react-query";

const useGetUsers = () => useQuery("getUsers", GetUsers);

const useGetUserResources = (id: string) =>
  useQuery(["getUserResources", id], () => GetUserResources(id));

const useGetResourceTypes = () =>
  useQuery("getResourceTypes", GetResourceTypes);

export { useGetUsers, useGetUserResources, useGetResourceTypes };
