import { useQuery } from "react-query";
import {
  GetACasefile,
  GetCaseFiles,
  GetCasefilesClientBalance,
  GetCasefilesTotalDeposit,
  GetCasefilesTotalExpenses,
} from "../services/casefiles";

const useGetCaseFiles = () => useQuery("getCasefiles", GetCaseFiles);

const useGetACasefile = (id: string) =>
  useQuery(["getACasefile", id], () => GetACasefile(id));

const useGetCasefileTotalDeposit = (id: string) =>
  useQuery(["getCaseflesTotalDeposit", id], () => GetCasefilesTotalDeposit(id));

const useGetCasefilesTotalExpenses = (id: string) =>
  useQuery(["getCasefilesTotalExpenses", id], () =>
    GetCasefilesTotalExpenses(id)
  );

const useGetCasefilesClientBalance = (id: string) =>
  useQuery(["getClientBalance", id], () => GetCasefilesClientBalance(id));

export {
  useGetCaseFiles,
  useGetACasefile,
  useGetCasefileTotalDeposit,
  useGetCasefilesTotalExpenses,
  useGetCasefilesClientBalance,
};
