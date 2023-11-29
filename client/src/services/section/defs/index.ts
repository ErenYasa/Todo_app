import { ISection } from '@/types/global';

export interface ISectionResponse extends ISection {
  createdAt: Date;
  updatedAt: Date;
}

export type ISectionsResponse = ISectionResponse[];

export interface ISectionUpdateRequest {
  id: string;
  body: Omit<ISection, 'name' | 'color' | 'order'>;
}
