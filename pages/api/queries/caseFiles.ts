import { useQuery } from "react-query";
import { GetACasefile, GetCaseFiles } from "../services/casefiles";

const useGetCaseFiles = () => useQuery("getCasefiles", GetCaseFiles);

const useGetACasefile = (id: string) =>
  useQuery(["getACasefile", id], () => GetACasefile(id));

export { useGetCaseFiles, useGetACasefile };
