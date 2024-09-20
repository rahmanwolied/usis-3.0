import { CalculatorIcon } from '@heroicons/react/24/solid';
import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    InputIcon,
} from '@radix-ui/react-icons';

import { BentoCard, BentoGrid } from '@/components/shared/bento-grid';

const features = [
    {
        Icon: FileTextIcon,
        name: 'Course Suggestions',
        description:
            'Get personalized course suggestions based on your degree requirements.',
        href: '/features/course-suggestion',
        cta: 'Lets Go',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: 'col-span-1',
    },
    {
        Icon: InputIcon,
        name: 'Find Empty Classrooms',
        description: 'Find empty classrooms and study spaces on campus.',
        href: '/features/empty-class-finder',
        cta: 'Find',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: 'col-span-1',
    },
    {
        Icon: CalendarIcon,
        name: 'Class Scheduler',
        description:
            'Schedule your classes in a visual calendar with additional features.',
        href: '/features/class-scheduler',
        cta: 'Make it yourself',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: 'col-span-1',
    },
    {
        Icon: CalculatorIcon,
        name: 'CGPA Calculator',
        description:
            'Calculate your CGPA and predict your future CGPA based on your grades.',
        href: '/feature/cgpa-calculator',
        cta: 'CG 4.0 Hobe',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: 'col-span-1',
    },
];

export default async function BentoDemo() {
    return (
        <div className="container px-20 py-5">
            <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
