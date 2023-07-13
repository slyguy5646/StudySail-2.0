import { PARSE_URL } from "./devUrl";

export async function parseBaseRequest<T>(endpoint: string, token: string | null, options?: RequestInit): Promise<T | null> {
  if (!token) {
    return null;
  }
  const callUrl = `${PARSE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const config = {
    ...options,
    headers,
  };

  const response = await fetch(callUrl, config);
  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
}
