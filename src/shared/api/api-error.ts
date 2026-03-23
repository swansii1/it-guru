export class ApiError extends Error {
  readonly status: number;
  readonly body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function messageFromBody(body: unknown, status: number): string {
  if (body !== null && typeof body === "object") {
    const msg = (body as Record<string, unknown>).message;
    if (typeof msg === "string" && msg.trim()) return msg;
    if (typeof msg === "number") return String(msg);
  }
  if (typeof body === "string" && body.trim()) {
    return body.length > 500 ? `${body.slice(0, 500)}…` : body;
  }
  if (status === 401) return "Неверный логин или пароль";
  if (status === 0) return "Нет соединения с сервером";
  return `Ошибка сервера (${status})`;
}

export async function throwApiErrorFromResponse(response: Response): Promise<never> {
  const status = response.status;
  const text = await response.text();
  let body: unknown;
  if (text) {
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = text;
    }
  }
  const message = messageFromBody(body, status);
  throw new ApiError(message, status, body);
}
