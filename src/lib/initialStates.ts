import { ApiResponse } from '@/types/ApiResponse.type';

export const ApiResponseInitialState: ApiResponse<null> = {
	status: 'success',
	data: null,
	message: '',
	code: 0,
};
