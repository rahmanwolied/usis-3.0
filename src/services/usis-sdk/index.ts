import {
    ClassSchedule,
    ClassScheduleWithLabs,
    USISResponseType,
} from '@/types/usisReponse.type';

import ApiClient from './apiClient';

export default class UsisSDK {
    private apiClient: ApiClient;

    constructor(cookie?: { jsessionid: string; srvname: string }) {
        this.apiClient = new ApiClient(cookie);
    }

    async getCurrentAcdemicSession(): Promise<string> {
        const now = new Date();
        const year = now.getFullYear();
        if (year === 2024) {
            if (now.getMonth() + 1 >= 10) {
                return '627125';
            }
            return '627124';
        }

        const params = {
            year,
        };
        const response = await this.apiClient.post(
            'academiaSession/getAllSessionByYear',
            null,
            { params },
        );
        const sessions = response.data;

        for (const session of sessions) {
            const startDate = new Date(session.start_date);
            const endDate = new Date(session.end_date);

            if (now >= startDate && now <= endDate) {
                return session.academic_session_id;
            }
        }
        return '627125';
    }

    async getClassSchedule(): Promise<USISResponseType<ClassSchedule>> {
        const academiaSession = await this.getCurrentAcdemicSession();
        const params = {
            rows: -1,
            page: 1,
            academiaSession: '627125',
        };
        const response = await this.apiClient.get(
            'studentCourse/showClassScheduleInTabularFormatInGrid',
            params,
        );
        return response.data;
    }

    async getClassScheduleWithLabs(): Promise<
        USISResponseType<ClassScheduleWithLabs>
    > {
        const academiaSession = await this.getCurrentAcdemicSession();
        const params = {
            rows: -1,
            page: 1,
            academiaSession: '627125',
        };
        const response = await this.apiClient.get(
            'academicSection/listAcademicSectionWithSchedule',
            params,
        );
        return response.data;
    }

    async getAdvisedCourse() {
        const params = {};

        const response = await this.apiClient.post(
            'studentCourse/advisedCourse',
            null,
            { params },
        );
        return response.data;
    }

    async showGradesheet() {
        const params = {};

        const response = await this.apiClient.post(
            'studentCourse/loadPreviousResultByStudent',
            null,
            { params },
        );
        return response.data;
    }

    async getSeatStatus(
        courseCode?: string,
        academiaSession: string = '627124',
    ) {
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
        const response = await this.apiClient.get(
            'studentCourse/showCourseStatusList',
            params,
        );
        return response.data;
    }

    async getProfile() {
        const params = {};

        const response = await this.apiClient.get(
            'student/showProfile',
            params,
        );
        return response.data;
    }

    async getMinimizedClassSchedule() {
        const response = await this.apiClient.get(
            'admissionRequirement/getAvailableSeatStatus',
        );
        return response.data;
    }
}
