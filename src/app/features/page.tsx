import Link from 'next/link';
import { Calculator, Calendar, Paperclip } from 'lucide-react';
import { FaSearch } from 'react-icons/fa';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
    const navs = [
        { href: 'features/class-schedule', label: 'Class Schedule', icon: <Calendar /> },
        { href: 'features/cgpa-calculator', label: 'CGPA', icon: <Calculator /> },
        { href: 'features/empty-class-finder', label: 'Classroom Finder', icon: <FaSearch /> },
        { href: 'features/course-suggestion', label: 'Course Suggestion', icon: <Paperclip /> },
    ];
    return (
        <div className="mt-10 flex justify-center gap-10">
            {navs.map((nav) => (
                <Link key={nav.href} href={nav.href}>
                    <Card>
                        <CardHeader>{nav.icon}</CardHeader>
                        <CardContent>{nav.label}</CardContent>
                        <CardFooter>Click to view</CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
