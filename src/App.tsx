import { BrowserRouter } from "react-router";
import StoreProvider from "./store-provider";
import RoutesProvider from "./routes";

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <RoutesProvider />
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
