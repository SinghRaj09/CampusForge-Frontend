const BASE_URL = "http://127.0.0.1:18080";

export async function request(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : null
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
