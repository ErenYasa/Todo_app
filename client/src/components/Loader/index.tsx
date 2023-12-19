import { DotsLoading } from "@/icons";


type Props = {
  width?: string;
  height?: string;
};

export function DotsLoader({ width, height }: Props) {
  return (
    <i>
      <DotsLoading width={width} height={height} />
    </i>
  );
}
