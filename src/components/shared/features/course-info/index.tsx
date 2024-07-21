import { useEffect, useState } from 'react';
import { Days, Times } from '@/enums';
import axios from 'axios';

import { CourseInfoType } from '@/types/usisReponse.type';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Filter } from './filter';
import { SectionsInfo } from './sections-info';

export interface FilterType<T> {
    name: string;
    items: T[];
}

export function CourseInfo() {
    const [courses, setCourses] = useState<CourseInfoType[]>([]);
    const [coursesCopy, setCoursesCopy] = useState<CourseInfoType[]>([]);
    const [filters, setFilters] = useState<FilterType<string | Days | Times>[]>([]);

    useEffect(() => {
        axios.get('/api/usis/class-schedule').then((res) => {
            console.log(res.data);
            setCourses(res.data);
            setCoursesCopy(res.data);
        });
    }, []);

    return (
        <Card className="md:w-2/3 lg:w-1/2">
            <CardHeader className="flex flex-row justify-between space-y-0">
                <div className="grid gap-3">
                    <CardTitle>Class Schedule Summer 2024</CardTitle>
                    <CardDescription>Class Schedule Summer 2024</CardDescription>
                </div>
                <Filter filters={filters} setFilters={setFilters} courses={courses} setCourses={setCoursesCopy} />
            </CardHeader>
            <CardContent>
                <Separator className="mb-3" />
                <div className="grid grid-flow-col gap-3">
                    {filters.map((filter, index) => (
                        <div className="flex gap-2" key={index}>
                            {filter.name}
                            {filter.items.map((item, index) => (
                                <Badge variant={'secondary'} key={index}>
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    ))}
                </div>
                <Table>
                    <TableCaption>Class Schedule</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Course</TableHead>
                            <TableHead className="text-center">Sections</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coursesCopy?.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell>{course?.code}</TableCell>
                                <TableCell>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center">Section</TableHead>
                                                <TableHead className="text-center">Days</TableHead>
                                                <TableHead className="text-center">Start</TableHead>
                                                <TableHead className="text-center">End</TableHead>
                                                <TableHead className="text-center">Faculty</TableHead>
                                                <TableHead className="text-center">Room</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <SectionsInfo sections={course?.sections} />
                                    </Table>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
