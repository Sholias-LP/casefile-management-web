import { useMutation } from "react-query";
import {
  AddCaseFile,
  ApproveExpenses,
  DeclineExpenses,
  DeleteCasefile,
  UpdateCasefile,
} from "../services/casefiles";

const useAddCasefile = () => useMutation(AddCaseFile);

const useUpdateCasefile = () => useMutation(UpdateCasefile);

const useDeleteCasefile = () => useMutation(DeleteCasefile);

const useApproveCasefileExpense = () => useMutation(ApproveExpenses);

const useDeclineCasefileExpense = () => useMutation(DeclineExpenses);

export {
  useAddCasefile,
  useDeleteCasefile,
  useUpdateCasefile,
  useApproveCasefileExpense,
  useDeclineCasefileExpense,
};
