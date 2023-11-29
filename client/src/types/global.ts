/**
 * INTERFACES
 */

export interface ISection {
  id: string;
  name: string;
  color: string;
  order: number;
  workspaceId: string;
  userId: string;
}

export interface IWorkspace {
  id: string;
  name: string;
  color: string;
  order: number;
  userId: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

/*  */

/**
 * ENUMS
 */

export enum ModalNames {
  CREATE_TODO = 'createTodo',
  EDIT_TODO = 'editTodo',
  CONFIRM = 'confirm',
}

export enum FilterStatus {
  INCOMPLETE = 0,
  COMPLETED = 1,
  ALL = 2,
}

/*  */

/**
 * TYPES
 */

/*  */
