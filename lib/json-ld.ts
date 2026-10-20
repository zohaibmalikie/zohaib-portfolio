/** Escape the script delimiter without changing the parsed structured values. */
export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
