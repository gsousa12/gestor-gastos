import { Sector } from "@/modules/sector/components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { ApiResponse } from "../../interfaces/api-response";
import { api } from "../../axios";
import { getApiResponse } from "../../interfaces/get-api-response";
import { GetSectorListRequest } from "../../queries/sector/getSectorListQuery";
import { GetSectorByIdRequest } from "../../queries/sector/getSectorByIdQuery";
import {
  GetSubSectorListBySectorIdRequest,
  GetSubSectorListBySectorIdResponse,
} from "../../queries/sector/getSubSectorListBySectorIdQuery";
import { CreateSubSectorRequest } from "../../mutations/sector/createSubSectorMutation";
import { SoftDeleteSubSectorByIdRequest } from "../../mutations/sector/softDeleteSubSectorByIdMutation";
import { CreateSectorRequest } from "../../mutations/sector/createSectorMutation";

export const getSectorListDispatch = async (
  request: GetSectorListRequest
): Promise<ApiResponse<Sector[]>> => {
  const { page, name } = request;

  const response = await api.get("/sector/", {
    params: {
      page,
      name,
    },
  });

  return getApiResponse<Sector[]>(response.data, []);
};

export const getSectorByIdDispatch = async (
  request: GetSectorByIdRequest
): Promise<ApiResponse<Sector>> => {
  const { id } = request;
  const response = await api.get(`/sector/${id}`);
  return getApiResponse<Sector>(response.data, {} as Sector);
};

export const getSubSectorListBySectorIdDispatch = async (
  request: GetSubSectorListBySectorIdRequest
): Promise<ApiResponse<GetSubSectorListBySectorIdResponse[]>> => {
  const { id } = request;
  const response = await api.get(`/sub-sector/${id}`);
  return getApiResponse<GetSubSectorListBySectorIdResponse[]>(
    response.data,
    []
  );
};

export const createSubSectorDispatch = async (
  request: CreateSubSectorRequest
): Promise<ApiResponse<null>> => {
  const response = await api.post("/sub-sector/", request);
  return getApiResponse<null>(response.data, null);
};

export const softDeleteSubSectorByIdDispatch = async (
  request: SoftDeleteSubSectorByIdRequest
): Promise<ApiResponse<null>> => {
  try {
    const { id } = request;
    const response = await api.delete(`/sub-sector/soft-delete/${id}`);
    return getApiResponse<null>(response.data, null);
  } catch (error) {
    throw error;
  }
};

export const createSectorDispatch = async (
  request: CreateSectorRequest
): Promise<ApiResponse<null>> => {
  const response = await api.post("/sector/", request);
  return getApiResponse<null>(response.data, null);
};
