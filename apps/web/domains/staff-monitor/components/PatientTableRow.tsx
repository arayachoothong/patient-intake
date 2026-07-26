"use client";

import { useRouter } from "next/navigation";
import { Badge, TableCell, TableRow } from "@patient/ui";
import { sessionStatusLabel, sessionStatusVariant, type Session } from "@patient/validation";
import { formatUpdatedAt } from "../helpers/format-updated-at.helper";
import { sessionDisplayName } from "../helpers/session-display-name.helper";

type PatientTableRowProps = {
  session: Session;
};

export function PatientTableRow({ session }: PatientTableRowProps) {
  const router = useRouter();
  const href = `/staff/${session.id}`;

  const navigate = () => {
    router.push(href);
  };

  return (
    <TableRow
      className="cursor-pointer"
      tabIndex={0}
      role="link"
      onClick={navigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate();
        }
      }}
    >
      <TableCell className="font-medium">{sessionDisplayName(session)}</TableCell>
      <TableCell>
        <Badge variant={sessionStatusVariant(session.status)}>
          {sessionStatusLabel(session.status)}
        </Badge>
      </TableCell>
      <TableCell className="tabular-nums">{session.progress}%</TableCell>
      <TableCell className="text-muted-foreground">{formatUpdatedAt(session.updatedAt)}</TableCell>
    </TableRow>
  );
}
