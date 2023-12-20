import { IconProps } from './interfaces/icons.interface';

export function MainLogo(props: IconProps) {
  return (
    <svg
      viewBox="0.43 0 1024 1023"
      className={props.className || 'main-logo'}
      width={props.width}
      height={props.height}
      fill={props.color || '#000000'}
      preserveAspectRatio="xMidYMid meet">
      <path
        d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h768q27 0 53 11l-117 116h-640q-26 0-45 19t-19 45v640q0 27 18.5 45.5t45.5 18.5h640q26 0 45-18.5t19-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-338-339q-19 19-47 18q-29 1-48-19l-188-187q-19-20-19-47.5t19.5-46.5t46.5-19t47 19l144 144l488-491q23 33 23 72v68q-8 31-20 42z"
        fill="currentColor"></path>
    </svg>
  );
}

export function Edit(props: IconProps) {
  return (
    <svg
      viewBox="120 -850 731.04 730"
      className={props.className || ''}
      width={props.width}
      height={props.height}
      fill={props.color || '#000000'}>
      <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z"></path>
    </svg>
  );
}

export function Delete(props: IconProps) {
  return (
    <svg
      viewBox="200 -760 560 560"
      className={props.className || ''}
      width={props.width}
      height={props.height}
      fill={props.color || '#000000'}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path>
    </svg>
  );
}

export function DotsLoading(props: IconProps) {
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

export function InfoIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={props.className || ''}
      width={props.width || '24px'}
      height={props.height || '24px'}
      fill={props.color || '#000000'}>
      <path
        d="M22.7368 36H25.5789V21.4737H22.7368V36ZM24 17.4316C24.4632 17.4316 24.8632 17.2737 25.2 16.9579C25.5368 16.6421 25.7053 16.2316 25.7053 15.7263C25.7053 15.2211 25.5474 14.8105 25.2316 14.4947C24.9158 14.1789 24.5053 14.0211 24 14.0211C23.4947 14.0211 23.0842 14.1789 22.7684 14.4947C22.4526 14.8105 22.2947 15.2211 22.2947 15.7263C22.2947 16.2316 22.4526 16.6421 22.7684 16.9579C23.0842 17.2737 23.4947 17.4316 24 17.4316ZM24 48C20.6737 48 17.5579 47.3684 14.6526 46.1053C11.7474 44.8421 9.21053 43.1263 7.0421 40.9579C4.87368 38.7895 3.15789 36.2526 1.89474 33.3474C0.631579 30.4421 0 27.3263 0 24C0 20.6737 0.631579 17.5474 1.89474 14.6211C3.15789 11.6947 4.87368 9.1579 7.0421 7.01053C9.21053 4.86316 11.7474 3.15789 14.6526 1.89474C17.5579 0.631579 20.6737 0 24 0C27.3263 0 30.4526 0.631579 33.3789 1.89474C36.3053 3.15789 38.8421 4.86316 40.9895 7.01053C43.1368 9.1579 44.8421 11.6947 46.1053 14.6211C47.3684 17.5474 48 20.6737 48 24C48 27.3263 47.3684 30.4421 46.1053 33.3474C44.8421 36.2526 43.1368 38.7895 40.9895 40.9579C38.8421 43.1263 36.3053 44.8421 33.3789 46.1053C30.4526 47.3684 27.3263 48 24 48ZM24.0632 45.1579C29.9158 45.1579 34.8947 43.0947 39 38.9684C43.1053 34.8421 45.1579 29.8316 45.1579 23.9368C45.1579 18.0842 43.1053 13.1053 39 9C34.8947 4.89474 29.8947 2.84211 24 2.84211C18.1474 2.84211 13.1579 4.89474 9.03158 9C4.90526 13.1053 2.84211 18.1053 2.84211 24C2.84211 29.8526 4.90526 34.8421 9.03158 38.9684C13.1579 43.0947 18.1684 45.1579 24.0632 45.1579Z"
        fill="currentColor"></path>
    </svg>
  );
}

export function AddIcon(props: IconProps) {
  return (
    <svg
      viewBox="4 4 16 16"
      className={props.className || ''}
      width={props.width || '24px'}
      height={props.height || '24px'}
      fill={props.color || '#000000'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.width || '24px'}
      height={props.height || '24px'}
      fill="none"
      stroke={props.color || '#000000'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ''}>
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
