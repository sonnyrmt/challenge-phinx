import { Skeleton } from "@mui/material";

interface Props {
  length?: number;
  width: number | string;
  height: number;
}

const CardSkeleton = ({ length, width, height }: Props) => {
  if (length) {
    return Array.from({ length }).map((_, idx) => (
      <Skeleton key={idx} variant="rounded" width={width} height={height} />
    ));
  }

  return <Skeleton variant="rounded" width={width} height={height} />;
};

export default CardSkeleton;
