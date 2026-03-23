// src/store/baseQuery.ts
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { getSession, signOut } from 'next-auth/react';
import { config } from '@/config';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.accessToken) {
      headers.set('Authorization', `Bearer ${session.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const session = await getSession();

    if (session?.error === 'RefreshAccessTokenError') {
      await signOut({ callbackUrl: '/login' });
      return result;
    }

    result = await rawBaseQuery(args, api, extraOptions);
  }

  return result;
};
