import { IExpenses } from "./casefiles";

export interface ITransaction {
  transactionType: string;
  client: string;
  gender: string;
  occupation: string;
  transactionSummary: string;
  serviceFee: number;
  deposit: number[];
  expenses: IExpenses[];
}

export interface ITransactionsResponse {
  author: string;
  client: string;
  deposit: number[];
  expenses: IExpenses[];
  gender: string;
  isDeleted: boolean;
  occupation: string;
  service_fee: number;
  status: string;
  transaction_id: string;
  transaction_type: string;
  _id: string;
}
