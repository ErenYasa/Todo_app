import { IWorkspace } from '@/types/global';

export interface IWorkspaceResponse extends IWorkspace {
  createdAt: Date;
  updatedAt: Date;
}

export type IWorkspacesResponse = IWorkspaceResponse[];

export interface IWorkspaceUpdateRequest {
  id: string;
  body: Omit<IWorkspace, 'name' | 'color' | 'order'>;
}
