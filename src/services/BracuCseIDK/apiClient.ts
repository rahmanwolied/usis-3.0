import axios, { AxiosInstance } from 'axios';

interface CustomError extends Error {
    status?: number;
}

class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.118 Safari/537.36',
                'Accept': 'application/json',
            },
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                const customError: CustomError = new Error(error.response?.data?.message || error.message);
                customError.status = error.response?.status;
                return Promise.reject(customError);
            }
        );

        this.client.interceptors.request.use(
            (request) => {
                console.log('Starting Request', request);
                return request;
            },
            (error) => {
                console.log('Request Error', error);
                return Promise.reject(error);
            }
        );
    }

    get(path: string, params?: any) {
        return this.client.get(path, { params });
    }
}

export default ApiClient;
