import { AxiosResponse } from "axios";
import { ICasefilesResponse } from "../../../interfaces/casefiles";
import { IResponse } from "../../../interfaces/response";
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

export {
  GetTransactions,
  GetATransaction,
  AddTransaction,
  UpdateTransaction,
  DeleteTransaction,
};
