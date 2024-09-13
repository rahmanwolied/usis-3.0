'use client';

import { useSession } from 'next-auth/react';

import { CourseInfo } from '@/app/features/class-schedule/components/course-info';

export default function Page() {
    const { status, data: session } = useSession();

    return (
        <div className="mt-10 flex justify-center">
            <CourseInfo />
        </div>
    );
}
