import { FaGraduationCap } from 'react-icons/fa';

export function Logo({
    variant = 'medium',
}: {
    variant?: 'large' | 'medium' | 'small';
}) {
    if (variant === 'large') {
        return (
            <div className="text-9xl">
                <U3IS />
            </div>
        );
    } else if (variant === 'medium') {
        return (
            <div className="text-6xl">
                <U3IS />
            </div>
        );
    }
    return (
        <div className="text-3xl">
            <U3IS />
        </div>
    );
}

function U3IS() {
    return (
        <h1 className="font-bold text-foreground/80">
            <div className="flex items-center gap-2">
                <FaGraduationCap className="text-primary" />
                <div>
                    U<span className="text-primary">3</span>IS
                </div>
            </div>
        </h1>
    );
}

Logo.displayName = 'USI3S';
