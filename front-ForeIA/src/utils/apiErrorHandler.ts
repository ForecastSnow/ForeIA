export class errorApi extends Error {
  public readonly statusCode: number;
  public readonly responseData: unknown;

  constructor(message: string, statusCode: number, responseData: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.responseData = responseData;
  }
}

export async function apiErrorHandler(response: Response) {
  if (response.ok) return response;
  const errorData: unknown = await response.json().catch(() => null);
  throw new errorApi(response.statusText || 'Ocurrió un error en la petición', response.status, errorData);
}
