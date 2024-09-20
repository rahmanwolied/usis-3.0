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
        href: '/features/course-suggestions',
        cta: 'Get started',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: '',
    },
    {
        Icon: InputIcon,
        name: 'Find Empty Classrooms',
        description: 'Find empty classrooms and study spaces on campus.',
        href: '/features/empty-class-finder',
        cta: 'Learn more',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: '',
    },
    {
        Icon: CalendarIcon,
        name: 'Class Scheduler',
        description:
            'Schedule your classes in a visual calendar with additional features.',
        href: '/',
        cta: 'Learn more',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: '',
    },
    {
        Icon: CalculatorIcon,
        name: 'CGPA Calculator',
        description:
            'Calculate your CGPA and predict your future CGPA based on your grades.',
        href: '/feature/cgpa-calculator',
        cta: 'Learn more',
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: '',
    },
];

export default async function BentoDemo() {
    return (
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
