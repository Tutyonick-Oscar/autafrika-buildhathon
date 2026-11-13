import "server-only";
import axios, { isAxiosError } from "axios";

/**
 * Single HTTP client used to talk to the API.
 * `server-only` guarantees it is never shipped to the browser,
 * so AUTH_TOKEN stays on the server.
 */
export const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    ...(process.env.AUTH_TOKEN && {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    }),
  },
});

/** Turns any error (axios or not) into a human-readable message. */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) return "The API is unreachable. Is it running?";
    const data = error.response.data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.detail === "string") return data.detail;
    return `The API responded with status ${error.response.status}.`;
  }
  return error instanceof Error ? error.message : "Unknown error.";
}
