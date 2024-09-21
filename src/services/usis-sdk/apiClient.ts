import axios, { type AxiosInstance } from 'axios';

interface CustomError extends Error {
    status?: number;
}

class ApiClient {
    private client: AxiosInstance;
    private cookie: { jsessionid: string; srvname: string } = {
        jsessionid: 'BD033FDB84104BCF2E9594FD2D921DCB',
        srvname: 'USISPCX',
    };

    constructor(cookie?: { jsessionid: string; srvname: string }) {
        this.client = axios.create({
            baseURL: 'https://usis.bracu.ac.bd/academia',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.118 Safari/537.36',
                Cookie: `JSESSIONID=${cookie?.jsessionid ?? this.cookie?.jsessionid}; SRVNAME=${cookie?.srvname ?? this.cookie?.srvname}`,
            },
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                const customError: CustomError = new Error(
                    error.response?.data?.message || error.message,
                );
                customError.status = error.response?.status;
                return Promise.reject(customError);
            },
        );

        this.client.interceptors.request.use(
            (request) => {
                console.log('Starting Request');
                request.headers['Accept'] = 'application/json';
                return request;
            },
            (error) => {
                console.log('Request Error', error);
                return Promise.reject(error);
            },
        );
    }

    get(path: string, params?: any) {
        return this.client.get(path, { params });
    }

    post(path: string, data: any, config: any) {
        return this.client.post(path, data, config);
    }

    put(path: string, data: any) {
        return this.client.put(path, data);
    }

    delete(path: string) {
        return this.client.delete(path);
    }

    setSessionToken(
        cookie: { jsessionid: string; srvname: string } | undefined,
    ) {
        this.client.defaults.headers.common['Cookie'] =
            `JSESSIONID=${cookie?.jsessionid}; SRVNAME=${cookie?.srvname}`;
    }
}

export default ApiClient;
