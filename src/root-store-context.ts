import { createContext, useContext } from "react";
import RootStore from "./store/root-store";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error(
      "useStores must be used within a RootStoreContext.Provider"
    );
  }
  return context;
};
