import { ReactNode } from "react";

export type DropdownListProps = {
  children: ReactNode;
  className?: string;
  title: string;
  alwaysOpen?: boolean;
  extendDropdownHeader?: ReactNode;
};
