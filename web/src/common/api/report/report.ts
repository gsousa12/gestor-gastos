import { api } from "../axios";

export interface CreateReportRequest {
  reportType: string;
  month: number;
  year: string;
}

function extractFilename(contentDisposition?: string): string {
  if (!contentDisposition) return "relatorio.pdf";
  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match && match[1] ? match[1] : "relatorio.pdf";
}

export const createReport = async (
  request: CreateReportRequest
): Promise<{ blob: Blob; filename: string }> => {
  const response = await api.post("/report/", request, {
    responseType: "blob",
  });
  const filename = extractFilename(response.headers["content-disposition"]);
  return { blob: response.data, filename };
};
