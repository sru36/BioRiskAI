import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface RisingStarsProps {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  layer?: "base" | "overlay";
}

const random = (max: number) => Math.floor(Math.random() * max);

const generateStarString = (count: number, width: number, height: number) =>
  Array.from({ length: count }, () => {
    const x1 = random(width);
    const y1 = random(height);
    const x2 = random(width);
    const y2 = random(height);
    return `${x1}px ${y1}px #FFF, ${x2}px ${y2}px #FFF`;
  }).join(", ");

const RisingStars = ({
  size = 1024,
  width = 3840,
  height = 3840,
  className,
  layer = "base",
}: RisingStarsProps) => {
  const smallStars = useMemo(
    () => generateStarString(size, width, height),
    [size, width, height],
  );

  const mediumStars = useMemo(
    () => generateStarString(Math.max(1, Math.floor(size / 2)), width, height),
    [size, width, height],
  );

  const largeStars = useMemo(
    () => generateStarString(Math.max(1, Math.floor(size / 4)), width, height),
    [size, width, height],
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 overflow-hidden",
        layer === "overlay" ? "opacity-60" : "opacity-100",
        className,
      )}
    >
      <div
        className="rising-stars__small relative h-px w-px bg-transparent animate-risingstar [animation-duration:333s] after:absolute after:top-[2048px] after:h-px after:w-px after:bg-transparent after:content-['']"
        style={{ boxShadow: smallStars }}
      />
      <div
        className="rising-stars__medium relative h-[2px] w-[2px] bg-transparent animate-risingstar [animation-duration:666s] after:absolute after:top-[2048px] after:h-[2px] after:w-[2px] after:bg-transparent after:content-['']"
        style={{ boxShadow: mediumStars }}
      />
      <div
        className="rising-stars__large relative h-[3px] w-[3px] bg-transparent animate-risingstar [animation-duration:999s] after:absolute after:top-[2048px] after:h-[3px] after:w-[3px] after:bg-transparent after:content-['']"
        style={{ boxShadow: largeStars }}
      />
    </div>
  );
};

export default RisingStars;
