/**
 * INTERFACES
 */

export interface IWorkspace {
  name: string;
  color: string;
  order: number;
  userId: string;
}

export interface IUser {
  id: number;
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
