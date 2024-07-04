import ApiClient from './apiClient';

export default class UsisSDK {
	private ApiClient: ApiClient;

	constructor() {
		this.ApiClient = new ApiClient();
	}

	async getAcdemicSession(year: string, semester: string) {
		const params = {
			year,
		};
		const response = await this.ApiClient.post('academiaSession/getAllSessionByYear', params);
		return response.data;
	}

	async getClassSchedule(courseCode?: string, academiaSession: string = '627124') {
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
		const response = await this.ApiClient.get('studentCourse/showClassScheduleInTabularFormatInGrid', params);
		return response.data;
	}
}
