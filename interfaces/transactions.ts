import { IDeposit, IExpenses } from "./casefiles";

export interface ITransaction {
  transactionType: string;
  client: string;
  gender: string;
  occupation: string;
  transactionSummary: string;
  serviceFee: number;
  deposit: IDeposit[];
  _id?: string;
  expenses: IExpenses[];
}

export interface ITransactionsResponse {
  author: string;
  transaction_summary: string;
  client: string;
  deposit: IDeposit[];
  expenses: IExpenses[];
  gender: string;
  isDeleted: boolean;
  occupation: string;
  service_fee: number;
  status: string;
  transaction_id: string;
  transaction_type: string;
  _id: string;
  createdAt: string;
  views: number;
}

export interface ITransactionExpense {
  transactionId: string;
  expenseId: string;
  action: string;
}
