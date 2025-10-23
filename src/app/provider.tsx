import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import RootStore from '@/store/root-store';
import { RootStoreContext } from './root-store-context';
import React from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  return (
    <QueryClientProvider client={queryClient}>
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>{children}</BrowserRouter>
      </RootStoreContext.Provider>
    </QueryClientProvider>
  );
};
