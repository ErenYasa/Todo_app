import { LoaderProps } from './defs';
import { DotsLoading } from '@/icons';

export function DotsLoader({ width, height }: LoaderProps) {
  return (
    <i>
      <DotsLoading width={width} height={height} />
    </i>
  );
}
