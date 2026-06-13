import axios from "axios";

export function isTransientRequestError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;

  return (
    error.code === "ERR_NETWORK" ||
    error.code === "ECONNABORTED" ||
    !error.response
  );
}

export function getRequestErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return "Unable to reach server. Please check your connection.";
    }

    const data = error.response?.data as { error?: string; message?: string } | undefined;
    return data?.error || data?.message || error.message;
  }

  if (error instanceof Error) return error.message;
  return "Request failed";
}
