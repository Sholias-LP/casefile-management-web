import { useQuery } from "react-query";
import {
  GetATransaction,
  GetClientBalance,
  GetTotalDeposit,
  GetTotalExpenses,
  GetTransactions,
} from "../services/transactions";

const useGetTransactions = () => useQuery("getTransactions", GetTransactions);

const useGetATransaction = (id: string) =>
  useQuery(["getATransaction", id], () => GetATransaction(id));

const useGetTotalExpenses = (id: string) =>
  useQuery(["getTotalExpenses", id], () => GetTotalExpenses(id));

const useGetTotalDeposit = (id: string) =>
  useQuery(["getTotalDeposit", id], () => GetTotalDeposit(id));

const useGetClientBalance = (id: string) =>
  useQuery(["getClientBalance", id], () => GetClientBalance(id));

export {
  useGetTransactions,
  useGetATransaction,
  useGetTotalExpenses,
  useGetClientBalance,
  useGetTotalDeposit,
};
