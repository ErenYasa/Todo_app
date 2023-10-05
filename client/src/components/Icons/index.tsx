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

export function DotsLoading(props: IIconProps) {
  return (
    <svg viewBox="0 44 52 12" width={props.width || '50px'} height={props.height || '15px'}>
      <circle fill={props.color || '#00000'} stroke="none" cx="6" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0" />
      </circle>
      <circle fill={props.color || '#00000'} stroke="none" cx="26" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle fill={props.color || '#00000'} stroke="none" cx="46" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  );
}
