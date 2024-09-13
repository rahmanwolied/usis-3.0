import { Dispatch, SetStateAction } from 'react';
import { Days, Times } from '@/enums';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { FilterType } from './course-info';

interface FilterBadgesProps {
    filters: FilterType[];
    setFilters: Dispatch<SetStateAction<FilterType[]>>;
}

export function FilterBadges({ filters, setFilters }: FilterBadgesProps) {
    function handleDeleteFilter(filter: FilterType, item: string | Days | Times, i: number) {
        filter = { ...filter, items: filter.items.filter((filterItem) => filterItem !== item) };
        filters[i] = filter;
        if (filter.items.length === 0) filters.splice(i, 1);
        console.log('deleted', filter, item, filters);
        setFilters([...filters]);
    }

    return (
        <div className="my-3 grid gap-3">
            {filters.map((filter, i) => (
                <div className="flex items-center gap-2" key={i}>
                    {filter.name}
                    {filter.items.map((item, j) => (
                        <Badge variant={'secondary'} key={j} className="relative py-2 pr-5">
                            {item}
                            <div className="cursor-pointer" onClick={() => handleDeleteFilter(filter, item, i)}>
                                <X size={8} className="absolute right-0 top-0 m-1 hover:bg-card" />
                            </div>
                        </Badge>
                    ))}
                </div>
            ))}
        </div>
    );
}
