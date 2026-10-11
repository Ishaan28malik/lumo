import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { PageTitleProvider } from './context/usePageTitleContext';
import { TeamOrgProvider } from './context/useTeamOrgContext';
import router from './router';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageTitleProvider>
        <TeamOrgProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div id="App">
              <RouterProvider router={router} />
            </div>
          </LocalizationProvider>
        </TeamOrgProvider>
      </PageTitleProvider>
    </QueryClientProvider>
  );
};

export default App;
