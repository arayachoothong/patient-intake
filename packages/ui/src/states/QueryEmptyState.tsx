import { cn } from "../lib/cn";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "../Empty";

type QueryEmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function QueryEmptyState({ title, description, className }: QueryEmptyStateProps) {
  return (
    <Empty className={cn("bg-background border", className)}>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
    </Empty>
  );
}
