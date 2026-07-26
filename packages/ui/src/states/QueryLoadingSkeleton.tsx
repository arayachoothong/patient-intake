import { cn } from "../lib/cn";
import { Skeleton } from "../Skeleton";

type QueryLoadingSkeletonProps = {
  rows?: number;
  className?: string;
};

export function QueryLoadingSkeleton({ rows = 4, className }: QueryLoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-4 w-full" />
      ))}
    </div>
  );
}
