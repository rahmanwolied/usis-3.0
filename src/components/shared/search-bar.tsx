import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { cn } from '@/lib/utils';

interface SearchbarProps {
    className?: string;
}

const Searchbar = ({ className }: SearchbarProps) => {
    return (
        <div className={cn('flex h-12 w-full items-center rounded-md bg-white/10 px-3', className)}>
            <MagnifyingGlassIcon className="size-6 text-white/60" />
            <input
                className="size-full border-0 bg-transparent px-2 caret-white focus:outline-none"
                placeholder="Search..."
            />
        </div>
    );
};

Searchbar.displayName = 'Searchbar';

export default Searchbar;
