import { UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  createReport,
  CreateReportRequest,
} from "../../dispatch/report/report";

export const useCreateReport = (): UseMutationResult<
  { blob: Blob; filename: string }, // tipo do retorno
  unknown,
  CreateReportRequest
> => {
  return useMutation({
    mutationFn: (request: CreateReportRequest) => createReport(request),
    onSuccess: (result: { blob: Blob; filename: string }) => {
      const { blob, filename } = result;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
  });
};
