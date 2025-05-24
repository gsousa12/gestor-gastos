export function getApiResponse<T>(
  response: any,
  emptyData: T
): { data: T; pagination?: any } {
  let data = response?.data;

  if (Array.isArray(emptyData)) {
    if (!Array.isArray(data)) {
      data = [];
    }
  } else {
    if (Array.isArray(data)) {
      data = data[0] ?? emptyData;
    } else if (!data) {
      data = emptyData;
    }
  }

  return {
    data,
    ...(response?.pagination ? { pagination: response.pagination } : {}),
  };
}
