export function Logo({ variant = 'medium' }: { variant?: 'large' | 'medium' | 'small' }) {
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
        <h1 className="font-bold">
            U<span className="text-blue-500">3</span>IS
        </h1>
    );
}

Logo.displayName = 'USI3S';
