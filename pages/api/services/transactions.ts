import { AxiosResponse } from "axios";
import { ICasefilesResponse } from "../../../interfaces/casefiles";
import { IResourseResponse, IResponse } from "../../../interfaces/response";
import {
  ITransaction,
  ITransactionsResponse,
} from "../../../interfaces/transactions";
import Axios from "./axios";

const GetTransactions = async () => {
  const res: AxiosResponse<IResponse<ITransactionsResponse[]>> =
    await Axios.get("/transactions");
  return res;
};

const GetATransaction = async (id: string) => {
  const res: AxiosResponse<IResponse<ITransactionsResponse>> = await Axios.get(
    `/transactions/${id}`
  );
  return res;
};

const AddTransaction = async (payload: ITransaction) => {
  const res: AxiosResponse<IResponse<ITransactionsResponse>> = await Axios.post(
    `/transactions/new`,
    payload
  );
  return res;
};

const UpdateTransaction = async (payload: ITransaction) => {
  const res: AxiosResponse<IResponse<ITransactionsResponse>> = await Axios.put(
    `/transactions/${payload._id}`,
    payload
  );
  return res;
};

const DeleteTransaction = async (id: string) => {
  const res: AxiosResponse<IResponse> = await Axios.delete(
    `/transactions/${id}`
  );
  return res;
};

const GetTotalExpenses = async (id: string) => {
  const res: AxiosResponse<IResourseResponse> = await Axios.get(
    `/transactions/${id}/totalexpenses`
  );
  return res;
};

const GetTotalDeposit = async (id: string) => {
  const res: AxiosResponse<IResourseResponse> = await Axios.get(
    `/transactions/${id}/totaldeposit`
  );
  return res;
};

const GetClientBalance = async (id: string) => {
  const res: AxiosResponse<IResourseResponse> = await Axios.get(
    `/transactions/${id}/balance`
  );
  return res;
};

export {
  GetTransactions,
  GetATransaction,
  AddTransaction,
  UpdateTransaction,
  DeleteTransaction,
  GetTotalExpenses,
  GetTotalDeposit,
  GetClientBalance,
};
