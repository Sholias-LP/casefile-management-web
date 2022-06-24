import { useQuery } from "react-query";
import { GetATransaction, GetTransactions } from "../services/transactions";

const useGetTransactions = () => useQuery("getTransactions", GetTransactions);

const useGetATransaction = (id: string) =>
  useQuery(["getATransaction", id], () => GetATransaction(id));

export { useGetTransactions, useGetATransaction };
