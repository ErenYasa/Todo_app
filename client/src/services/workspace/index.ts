import { baseApi } from '..';
import { toast } from 'react-toastify';
import { ISuccessResponse } from '../defs';
import { IWorkspaceResponse, IWorkspaceUpdateRequest, IWorkspacesResponse } from './defs';
import { IWorkspace } from '@/types/global';

const workspaceService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspace: builder.query<IWorkspaceResponse, string>({
      query: (id) => ({
        url: `workspace/${id}`,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
    }),
    getWorkspaces: builder.query<IWorkspacesResponse, any>({
      query: () => {
        const userId = localStorage.getItem(`${process.env.APP_NAME}_userId`);

        return {
          url: `workspace/${userId}`,
        };
      },
      providesTags: ['Workspaces'],
      transformResponse: (response: ISuccessResponse<IWorkspacesResponse>) => response.data.result,
    }),
    createWorkspace: builder.mutation<IWorkspaceResponse, IWorkspace>({
      query: (body) => ({
        url: 'workspace',
        method: 'POST',
        body,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Work Space created successfully');
        });
      },
      invalidatesTags: ['Workspaces'],
    }),
    updateWorkspace: builder.mutation<IWorkspace, IWorkspaceUpdateRequest>({
      query: ({ id, body }) => ({
        url: `workspace/${id}`,
        method: 'PUT',
        body,
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Work Space updated successfully');
        });
      },
      transformResponse: (response: ISuccessResponse<IWorkspace>) => response.data.result,
    }),
    deleteWorkspace: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `workspace/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Work Space deleted successfully');
        });
      },
      invalidatesTags: ['Workspaces'],
      transformResponse: (response: ISuccessResponse<boolean>) => response.data.result,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWorkspaceQuery,
  useLazyGetWorkspaceQuery,
  useGetWorkspacesQuery,
  useLazyGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceService;
