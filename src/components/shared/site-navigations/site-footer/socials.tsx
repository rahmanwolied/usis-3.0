import React from 'react';
import Link from 'next/link';

import { socials } from '@/config/socials';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Socials = () => {
    return (
        <ul className="flex gap-x-6">
            {socials.map((item) => (
                <li key={item.name}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    className="text-gray-500 hover:text-gray-400">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="size-6" aria-hidden="true" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>{item.name}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li>
            ))}
        </ul>
    );
};

Socials.displayName = 'Socials';

export default Socials;
