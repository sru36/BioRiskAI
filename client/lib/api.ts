import axios from "axios";
import type { PredictRequest, PredictResponse } from "@shared/api";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const submitPrediction = async (
  payload: PredictRequest,
): Promise<PredictResponse> => {
  const { data } = await apiClient.post<PredictResponse>("/predict", payload);
  return data;
};
