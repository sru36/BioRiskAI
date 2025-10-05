import { ReactNode } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InputCardProps {
  title: string;
  description?: string;
  tooltip?: string;
  children: ReactNode;
}

const InputCard = ({
  title,
  description,
  tooltip,
  children,
}: InputCardProps) => {
  return (
    <div className="relative rounded-2xl border border-primary/40 bg-card/70 p-6 shadow-[0_0_25px_rgba(6,182,212,0.1)] backdrop-blur-xl transition hover:border-accent hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-orbitron text-lg font-semibold tracking-wide text-accent">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {tooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${title} info`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/60 text-accent transition hover:border-accent hover:text-accent"
              >
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-secondary/90 text-sm text-secondary-foreground">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default InputCard;
