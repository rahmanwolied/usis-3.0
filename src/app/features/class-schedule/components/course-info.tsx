'use client';

import { useEffect, useState } from 'react';
import { Days, Times } from '@/enums';
import { combineCourseInfo } from '@/utilities/format-response';
import { extractDayTimeRoom } from '@/utilities/helpers';
import axios from 'axios';

import { Course } from '@/types/usisReponse.type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Filter } from './filter';
import { FilterBadges } from './filter-badges';
import { Loading } from './loading';
import { SectionsInfo } from './sections-info';

export interface FilterType<T = string | Days> {
    name: string;
    items: T[];
}

export function CourseInfo() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    async function updateCourses() {
        setIsLoading(true);
        try {
            const response = await axios.post(
                '/api/usis/update-class-schedule',
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get('/api/usis/class-schedule', {
                    params: {},
                });
                console.log(response.data.data);
                setCourses(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCourses();
    }, [filters]);

    return (
        <Card className="md:w-2/3 lg:w-1/2">
            <CardHeader className="flex flex-row justify-between space-y-0">
                <div className="grid gap-3">
                    <CardTitle>Class Schedule Summer 2024</CardTitle>
                    <CardDescription>
                        Class Schedule Summer 2024
                    </CardDescription>
                </div>
                <Filter filters={filters} setFilters={setFilters} />
            </CardHeader>
            <CardContent>
                <Separator className="mb-3" />
                <FilterBadges filters={filters} setFilters={setFilters} />
                <Button onClick={updateCourses}>
                    {isLoading ? 'Updating' : 'Update'}
                </Button>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table>
                        <TableCaption>Class Schedule</TableCaption>
                        {courses?.slice(0, 50).map((course, index) => (
                            <TableRow key={index}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                colSpan={5}
                                                className="text-center">
                                                {course?.code}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <SectionsInfo
                                            sections={course.sections}
                                        />
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
