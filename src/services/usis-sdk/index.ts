import ApiClient from './apiClient';

export default class UsisSDK {
    private apiClient: ApiClient;

    constructor(cookie?: { jsessionid: string; srvname: string }) {
        this.apiClient = new ApiClient(cookie);
    }

    async getAcdemicSession(year: string, semester: string) {
        const params = {
            year,
        };
        const response = await this.apiClient.post('academiaSession/getAllSessionByYear', null, { params });
        return response.data;
    }

    async getClassSchedule(courseCode?: string, academiaSession: string = '627124') {
        const params = {
            _search: false,
            nd: '',
            rows: 50,
            page: 1,
            sidx: '',
            sord: 'asc',
            academiaSession,
            query: courseCode,
        };
        const response = await this.apiClient.get('studentCourse/showClassScheduleInTabularFormatInGrid', params);
        return response.data;
    }

    async getAdvisedCourse() {
        const params = {};

        const response = await this.apiClient.post('studentCourse/advisedCourse', null, { params });
        return response.data;
    }

    async showGradesheet() {
        const params = {};

        const response = await this.apiClient.post('studentCourse/loadPreviousResultByStudent', null, { params });
        return response.data;
    }

    async getSeatStatus(courseCode?: string, academiaSession: string = '627124') {
        const params = {
            query: courseCode,
            academiaSession,
            _search: 'false',
            nd: '',
            rows: -1,
            page: 1,
            sidx: '',
            sord: 'desc',
        };
        const response = await this.apiClient.get('studentCourse/showCourseStatusList', params);
        return response.data;
    }

    async getProfile() {
        const params = {};

        const response = await this.apiClient.get('student/showProfile', params);
        return response.data;
    }
}
