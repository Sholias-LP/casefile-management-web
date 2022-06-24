import { AxiosResponse } from "axios";
import { ICasefilesResponse } from "../../../interfaces/casefiles";
import { IResponse } from "../../../interfaces/response";
import { ITransactionsResponse } from "../../../interfaces/transactions";
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

export { GetTransactions, GetATransaction };
