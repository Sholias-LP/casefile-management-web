import { AxiosResponse } from "axios";
import { ICasefile, ICasefilesResponse } from "../../../interfaces/casefiles";
import { IResponse } from "../../../interfaces/response";
import Axios from "./axios";

const GetCaseFiles = async () => {
  const res: AxiosResponse<IResponse<ICasefilesResponse[]>> = await Axios.get(
    "/casefiles"
  );
  return res;
};

const GetACasefile = async (id: string) => {
  const res: AxiosResponse<IResponse<ICasefilesResponse>> = await Axios.get(
    `/casefiles/${id}`
  );
  return res;
};

const AddCaseFile = async (payload: ICasefile) => {
  const res: AxiosResponse<IResponse<ICasefilesResponse>> = await Axios.post(
    `/casefiles/new`,
    payload
  );
  return res;
};

const UpdateCasefile = async (payload: ICasefile) => {
  const res: AxiosResponse<IResponse<ICasefilesResponse>> = await Axios.put(
    `/casefiles/${payload._id}`,
    payload
  );
  return res;
};

const DeleteCasefile = async (id: string) => {
  const res: AxiosResponse<IResponse> = await Axios.delete(`/casefiles/${id}`);
  return res;
};

export {
  GetCaseFiles,
  GetACasefile,
  AddCaseFile,
  UpdateCasefile,
  DeleteCasefile,
};
