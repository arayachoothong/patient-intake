"use client";

type TypingIndicatorProps = {
  visible: boolean;
};

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <p className="text-sm text-sky-800" role="status">
      Patient is typing…
    </p>
  );
}
