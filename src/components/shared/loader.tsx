import React from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
    className?: string;
}

const Loader = ({ className }: LoaderProps) => {
    return (
        <div
            className={cn(
                'size-10 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500',
                className,
            )}
        />
    );
};

Loader.displayName = 'Loader';

export default Loader;
