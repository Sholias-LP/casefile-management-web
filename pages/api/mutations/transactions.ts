import {
  AddTransaction,
  DeleteTransaction,
  UpdateTransaction,
} from "../services/transactions";
import { useMutation } from "react-query";

const useAddTransactions = () => useMutation(AddTransaction);

const useUpdateTransactions = () => useMutation(UpdateTransaction);

const useDeleteTransactions = () => useMutation(DeleteTransaction);

export { useAddTransactions, useDeleteTransactions, useUpdateTransactions };
