import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      //staleTime: 1000 * 60 * 10, // 10 minutos
    },
    mutations: {
      retry: 0,
    },
  },
});
