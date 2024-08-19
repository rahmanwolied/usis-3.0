import Link from 'next/link';

export default function Page() {
    return (
        <div className="mt-10 flex justify-center gap-10">
            <Link href={'features/class-schedule'}>Class Schedule</Link>
            <Link href={'features/cgpa-calculator'}>CGPA</Link>
        </div>
    );
}
