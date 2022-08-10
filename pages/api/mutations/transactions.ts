import {
  AddTransaction,
  ApproveTransactionExpenses,
  DeclineTransactionExpenses,
  DeleteTransaction,
  UpdateTransaction,
} from "../services/transactions";
import { useMutation } from "react-query";

const useAddTransactions = () => useMutation(AddTransaction);

const useUpdateTransactions = () => useMutation(UpdateTransaction);

const useDeleteTransactions = () => useMutation(DeleteTransaction);

const useApproveTransactionExpense = () =>
  useMutation(ApproveTransactionExpenses);

const useDeclineTransactionExpense = () =>
  useMutation(DeclineTransactionExpenses);

export {
  useAddTransactions,
  useDeleteTransactions,
  useUpdateTransactions,
  useApproveTransactionExpense,
  useDeclineTransactionExpense,
};
