import { BrowserRouter } from "react-router";
import StoreProvider from "./store-provider";
import RoutesProvider from "./routes";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <BrowserRouter>
          <RoutesProvider />
        </BrowserRouter>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
