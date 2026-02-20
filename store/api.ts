import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Language } from '@/utils/interfaces/language';
import { Snippet } from '@/utils/interfaces/snippet';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Language', 'Sheet'],
  endpoints: (builder) => ({
    getLanguages: builder.query<Language[], void>({
      query: () => '/language/',
      transformResponse: (response: { count: number; results: Language[] }) =>
        response.results,
      providesTags: ['Language'],
    }),

    getSheets: builder.query<Snippet[], string | void>({
      query: (search) => ({
        url: '/sheet/',
        params: search ? { search } : {},
      }),
      transformResponse: (response: { count: number; results: Snippet[] }) =>
        response.results,
      providesTags: ['Sheet'],
    }),

    getSheet: builder.query<Snippet, number>({
      query: (id) => `/sheet/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Sheet', id }],
    }),

    createSheet: builder.mutation<
      Snippet,
      {
        title: string;
        description: string;
        code_snippet: string;
        language: string;
      }
    >({
      query: (body) => ({
        url: '/sheet/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sheet'],
    }),

    updateSheet: builder.mutation<
      Snippet,
      {
        id: number;
        data: {
          title: string;
          description: string;
          code_snippet: string;
          language: string;
        };
      }
    >({
      query: ({ id, data }) => ({
        url: `/sheet/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Sheet', id },
        'Sheet',
      ],
    }),

    deleteSheet: builder.mutation<void, number>({
      query: (id) => ({
        url: `/sheet/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sheet'],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useGetSheetsQuery,
  useGetSheetQuery,
  useCreateSheetMutation,
  useUpdateSheetMutation,
  useDeleteSheetMutation,
} = api;
