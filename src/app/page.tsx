import { CourseInfo } from '@/app/features/class-schedule/components/course-info';

import UsisLoginModal from './components/usis-login-modal';

export default function Page() {
    return (
        <div className="mt-10 flex justify-center gap-10">
            <UsisLoginModal />
            <CourseInfo />
        </div>
    );
}
