'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MantineProvider theme={{
        primaryColor: 'dark',
      }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '16px',
              padding: '12px 20px',
            },
            success: {
              style: {
                background: 'green',
                color: 'white',
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white',
              },
            },
          }}
        />
        {children}
      </MantineProvider>
    </Provider>
  );
}
