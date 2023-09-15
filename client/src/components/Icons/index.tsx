import { IIconProps } from './interfaces/icons.interface';

export function Edit(props: IIconProps) {
  return (
    <svg
      viewBox="120 -850 731.04 730"
      className={props.className || ''}
      width={props.width}
      height={props.height}
      fill={props.color}>
      <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z"></path>
    </svg>
  );
}
export function Delete(props: IIconProps) {
  return (
    <svg
      viewBox="200 -760 560 560"
      className={props.className || ''}
      width={props.width}
      height={props.height}
      fill={props.color}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path>
    </svg>
  );
}
