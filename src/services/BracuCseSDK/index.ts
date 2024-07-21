import ApiClient from './apiClient';

const baseURL = 'https://www.cse.sds.bracu.ac.bd';

class BracuCseSDK {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient(baseURL);
    }

    async getFacultyList(searchQuery: string) {
        try {
            const response = await this.apiClient.get('/faculty_list', { search: searchQuery });
            const { serverMemo } = response.data;

            if (serverMemo && serverMemo.htmlHash) {
                console.log('HTML Hash:', serverMemo.htmlHash);
            }

            if (serverMemo && serverMemo.data) {
                console.log('Search Data:', serverMemo.data.search);
            }

            return serverMemo;
        } catch (error) {
            console.error('Error fetching faculty list:', error);
            throw error;
        }
    }

    async getCseCourseList(searchQuery: string) {
        try {
            const response = await this.apiClient.get('/course/list', { search: searchQuery });
            const { serverMemo } = response.data;

            if (serverMemo && serverMemo.htmlHash) {
                console.log('HTML Hash:', serverMemo.htmlHash);
            }

            if (serverMemo && serverMemo.data) {
                console.log('Search Data:', serverMemo.data.search);
            }

            return serverMemo;
        } catch (error) {
            console.error('Error fetching Course list:', error);
            throw error;
        }
    }
}

export default BracuCseSDK;
