export const extractApiError = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object" && "response" in err) {
    const message = (err as { response?: { data?: { message?: string } } })
      .response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};
