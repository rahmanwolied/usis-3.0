import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Days, Times } from '@/enums';
import { ListFilter } from 'lucide-react';

import { Course } from '@/types/usisReponse.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FilterType } from './course-info';

interface FilterProps {
    filters: FilterType[];
    setFilters: Dispatch<SetStateAction<FilterType[]>>;
}

const days: Days[] = [Days.Saturday, Days.Sunday, Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday];
const times: Times[] = [
    Times['08:00 AM'],
    Times['09:00 AM'],
    Times['09:30 AM'],
    Times['10:00 AM'],
    Times['10:05 AM'],
    Times['11:00 AM'],
    Times['11:10 AM'],
    Times['12:15 PM'],
    Times['12:30 PM'],
    Times['02:00 PM'],
    Times['03:05 PM'],
    Times['03:30 PM'],
    Times['04:10 PM'],
    Times['05:00 PM'],
    Times['06:00 PM'],
    Times['06:30 PM'],
];

export function Filter({ setFilters, filters }: FilterProps) {
    const courseRef = useRef<HTMLInputElement>(null);
    const facultyRef = useRef<HTMLInputElement>(null);
    const [day, setDay] = useState<Days>();
    const [time, setTime] = useState<Times>();

    function applyFilter() {
        let courseFilters = filters.find((filter) => filter.name === 'Courses')?.items as string[];
        let facultyFilters = filters.find((filter) => filter.name === 'Faculties')?.items;
        let dayFilters = filters.find((filter) => filter.name === 'Days')?.items;
        let timeFilters = filters.find((filter) => filter.name === 'Start Times')?.items;

        if (courseRef.current!.value) {
            if (!courseFilters) {
                const idx = filters.push({ name: 'Courses', items: [] });
                courseFilters = filters[idx - 1].items as string[];
            }
            if (!courseFilters.includes(courseRef.current!.value.toUpperCase())) courseFilters.push(courseRef.current!.value.toUpperCase());
        }
        if (facultyRef.current!.value) {
            if (!facultyFilters) {
                const idx = filters.push({ name: 'Faculties', items: [] });
                facultyFilters = filters[idx - 1].items;
            }
            if (!facultyFilters.includes(facultyRef.current!.value.toUpperCase())) facultyFilters.push(facultyRef.current!.value.toUpperCase());
        }
        if (day) {
            if (!dayFilters) {
                const idx = filters.push({ name: 'Days', items: [] });
                dayFilters = filters[idx - 1].items;
            }
            if (!dayFilters.includes(day)) dayFilters.push(day);
        }
        if (time) {
            if (!timeFilters) {
                const idx = filters.push({ name: 'Start Times', items: [] });
                timeFilters = filters[idx - 1].items;
            }
            if (!timeFilters.includes(time)) timeFilters.push(time);
        }

        setFilters([...filters]);
    }

    return (
        <div className="mt-0">
            <Popover>
                <PopoverTrigger>
                    <Button className="mt-0 w-full bg-card p-3" variant="outline">
                        <ListFilter />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="grid gap-4">
                    <h1 className="text-center text-lg font-bold">Filter</h1>
                    <h1 className="text-center text-xs">Filter out coureses or sections</h1>
                    <div className="grid items-center gap-4">
                        <Label>Course</Label>
                        <Input ref={courseRef} />

                        <Label>Faculty</Label>
                        <Input ref={facultyRef} />

                        <Label>Days</Label>
                        <Select onValueChange={(value: Days) => setDay(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Days" />
                            </SelectTrigger>
                            <SelectContent className="bg-card">
                                {days
                                    .filter((day) => !filters.find((filter) => filter.name === 'Days')?.items.includes(day))
                                    .map((day, index) => (
                                        <>
                                            <SelectItem key={index} value={Days[day]}>
                                                {Days[day]}
                                            </SelectItem>
                                            <SelectSeparator />
                                        </>
                                    ))}
                            </SelectContent>
                        </Select>

                        <Label>Start Time</Label>
                        <Select onValueChange={(value: Times) => setTime(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Start Time" />
                            </SelectTrigger>
                            <SelectContent className="bg-card">
                                {times
                                    .filter((time) => !filters.find((filter) => filter.name === 'Start Times')?.items.includes(time))
                                    .map((time, index) => (
                                        <>
                                            <SelectItem key={index} value={Times[time]}>
                                                {Times[time]}
                                            </SelectItem>
                                            <SelectSeparator />
                                        </>
                                    ))}
                            </SelectContent>
                        </Select>
                        <Button className="col-span-2 mt-3 bg-foreground text-background hover:text-foreground" onClick={applyFilter}>
                            Apply Filters
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
