import { baseApi } from '..';
import { toast } from 'react-toastify';
import { ISuccessResponse } from '../defs';
import { ISectionResponse, ISectionUpdateRequest, ISectionsResponse } from './defs';
import { ISection } from '@/types/global';

const sectionService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSection: builder.query<ISectionResponse, string>({
      query: (id) => ({
        url: `section/${id}`,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
    }),
    getSections: builder.query<ISectionsResponse, any>({
      query: () => {
        const userId = localStorage.getItem(`${process.env.APP_NAME}_userId`);

        return {
          url: `section/${userId}`,
        };
      },
      providesTags: ['Sections'],
      transformResponse: (response: ISuccessResponse<ISectionsResponse>) => response.data.result,
    }),
    createSection: builder.mutation<ISectionResponse, ISection>({
      query: (body) => ({
        url: 'section',
        method: 'POST',
        body,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Section created successfully');
        });
      },
      invalidatesTags: ['Sections'],
    }),
    updateSection: builder.mutation<ISection, ISectionUpdateRequest>({
      query: ({ id, ...body }) => ({
        url: `section/${id}`,
        method: 'PUT',
        body,
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Section updated successfully');
        });
      },
      invalidatesTags: ['Sections'],
      transformResponse: (response: ISuccessResponse<ISection>) => response.data.result,
    }),
    deleteSection: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `section/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Section deleted successfully');
        });
      },
      invalidatesTags: ['Sections'],
      transformResponse: (response: ISuccessResponse<boolean>) => response.data.result,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSectionQuery,
  useLazyGetSectionQuery,
  useGetSectionsQuery,
  useLazyGetSectionsQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionService;
