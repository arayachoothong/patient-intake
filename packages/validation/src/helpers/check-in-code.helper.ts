export function checkInCode(sessionId: string): string {
  const hex = sessionId.replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
}
