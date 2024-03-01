"use client";
import { SessionProvider } from "next-auth/react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store';
const queryClient = new QueryClient();
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store} >
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default Provider