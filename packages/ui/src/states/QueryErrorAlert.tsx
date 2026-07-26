import { Alert, AlertDescription, AlertTitle } from "../Alert";

type QueryErrorAlertProps = {
  title: string;
  description?: string;
  className?: string;
};

export function QueryErrorAlert({ title, description, className }: QueryErrorAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
    </Alert>
  );
}
