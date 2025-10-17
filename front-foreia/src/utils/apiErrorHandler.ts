export class errorApi extends Error {
    public readonly statusCode: number;
    public readonly responseData: any;

    constructor(message: string, statusCode: number, responseData: any = null) {

        super(message);

        this.name = 'CustomError';

        this.statusCode = statusCode;
        this.responseData = responseData;

        Object.setPrototypeOf(this, errorApi.prototype);
    }
}

export async function apiErrorHandler(response: Response) {

    if (response.ok) {
        return response;
    }

    let errorData = null;
    try {
        errorData = await response.json();
    } catch (e) {
       
    }

    const error = new errorApi(
        response.statusText || 'Ocurrió un error en la petición',
        response.status,
        errorData
    );

    throw error;
}

