import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppController } from "./common/components/app-controller/AppController";
import { AppLayout } from "./common/components/app-layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppController>
      <AppLayout />
    </AppController>
  </QueryClientProvider>
);

export default App;
