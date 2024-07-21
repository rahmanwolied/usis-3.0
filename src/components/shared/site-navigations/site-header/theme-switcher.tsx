'use client';

import { LucideMoonStar, LucideSunMedium, LucideWrench } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function ThemeSwitcher() {
    const { theme, setTheme, themes: _themes } = useTheme();

    // const themes = _themes.map((_theme) => ({
    //     theme: _theme,
    //     name: _theme[0].toUpperCase + _theme.slice(1),
    //     logo: _theme === 'light' ? <LucideSunMedium /> : _theme === 'dark' ? <LucideMoonStar /> : <LucideWrench />,
    // }));

    return (
        <Popover>
            <PopoverTrigger className="rounded-md p-2 hover:bg-white/15">
                {theme === 'light' ? <LucideSunMedium /> : theme === 'dark' ? <LucideMoonStar /> : <LucideWrench />}
            </PopoverTrigger>
            <PopoverContent className="w-full bg-card">
                <div className="flex justify-between gap-4">
                    <div
                        className="flex cursor-pointer flex-col items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5"
                        onClick={(e) => setTheme('light')}>
                        <LucideSunMedium className="text-foreground" />
                        <p className="text-xs text-foreground">Light</p>
                    </div>
                    <div
                        className="flex cursor-pointer flex-col items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5"
                        onClick={(e) => setTheme('dark')}>
                        <LucideMoonStar className="text-foreground" />
                        <p className="text-xs text-foreground">Dark</p>
                    </div>
                    <div
                        className="flex cursor-pointer flex-col items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5"
                        onClick={(e) => setTheme('system')}>
                        <LucideWrench className="text-foreground" />
                        <p className="text-xs text-foreground">System</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
