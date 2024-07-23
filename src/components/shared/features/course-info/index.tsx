import { useEffect, useState } from 'react';
import { Days, Times } from '@/enums';
import axios from 'axios';

import { CourseInfoType } from '@/types/usisReponse.type';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Filter } from './filter';
import { FilterBadges } from './filter-badges';
import { Loading } from './loading';
import { SectionsInfo } from './sections-info';

export interface FilterType<T = string | Days | Times> {
    name: string;
    items: T[];
}

export function CourseInfo() {
    const [courses, setCourses] = useState<CourseInfoType[]>([]);
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getCourses() {
            setIsLoading(true);
            const res = await axios.post('/api/usis/class-schedule', filters);
            console.log(res.data);
            setCourses(res.data);
            setIsLoading(false);
        }
        getCourses();
    }, [filters]);

    return (
        <Card className="md:w-2/3 lg:w-1/2">
            <CardHeader className="flex flex-row justify-between space-y-0">
                <div className="grid gap-3">
                    <CardTitle>Class Schedule Summer 2024</CardTitle>
                    <CardDescription>Class Schedule Summer 2024</CardDescription>
                </div>
                <Filter filters={filters} setFilters={setFilters} />
            </CardHeader>
            <CardContent>
                <Separator className="mb-3" />
                <FilterBadges filters={filters} setFilters={setFilters} />
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table>
                        <TableCaption>Class Schedule</TableCaption>
                        {courses?.map((course, index) => (
                            <TableRow key={index}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead colSpan={5} className="text-center">
                                                {course?.code}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <SectionsInfo sections={course.sections} />
                                    </TableBody>
                                </Table>
                            </TableRow>
                        ))}
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
