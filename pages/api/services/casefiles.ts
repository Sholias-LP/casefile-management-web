import { AxiosResponse } from "axios";
import { ICasefilesResponse } from "../../../interfaces/casefiles";
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

export { GetCaseFiles, GetACasefile };
