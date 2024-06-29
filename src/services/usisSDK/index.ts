import apiClient from './apiClient';

export default class UsisSDK {
	async getClassSchedule(courseCode?: string, academiaSession: string = '627124') {
		// 'studentCourse/showClassScheduleInTabularFormatInGrid?academiaSession=627122&_search=false&nd=&rows=-1&page=1&sidx=&sord=asc'
		const params = {
			_search: false,
			nd: '',
			rows: -1,
			page: 1,
			sidx: '',
			sord: 'asc',
			academiaSession,
			query: courseCode,
		};
		const response = await apiClient.get('studentCourse/showClassScheduleInTabularFormatInGrid', params);
		return response.data;
	}

	// async getAcademicSessionId(academicSession: string) {}
}
