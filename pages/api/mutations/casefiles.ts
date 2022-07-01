import { useMutation } from "react-query";
import {
  AddCaseFile,
  DeleteCasefile,
  UpdateCasefile,
} from "../services/casefiles";

const useAddCasefile = () => useMutation(AddCaseFile);

const useUpdateCasefile = () => useMutation(UpdateCasefile);

const useDeleteCasefile = () => useMutation(DeleteCasefile);

export { useAddCasefile, useDeleteCasefile, useUpdateCasefile };
