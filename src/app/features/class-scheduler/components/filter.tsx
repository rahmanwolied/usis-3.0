import { useEffect, useState } from 'react';
import { Times } from '@/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClockIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/shared/multi-select';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
].map((day) => {
    return {
        value: day,
        label: day,
    };
});
const times = Times.map((time) => {
    return {
        value: time,
        label: time,
        icon: ClockIcon,
    };
});
const FormSchema = z.object({
    courses: z
        .array(z.string().min(1))
        .min(0)
        .nonempty('Please select at least one Course before applying filter.'),
    facultyInitials: z.array(z.string().min(1)).min(0),
    days: z.array(z.string().min(1)).min(0),
    startTimes: z.array(z.string().min(1)).min(0),
});

export default function Filter({ setFilteredCourses }: any) {
    const [courses, setCourses] = useState<string[]>([]);
    const [faculties, setFaculties] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            courses: [],
            facultyInitials: [],
            days: [],
            startTimes: [],
        },
    });

    useEffect(() => {
        async function getFaculties() {
            try {
                const response = await axios.post('/api/usis/get-faculties', {
                    courses: form.watch('courses'),
                });
                console.log(response.data.data);
                setFaculties(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getFaculties();
    }, [form, form.watch('courses')]);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get('/api/usis/get-all-courses');
                console.log('courses', response.data.data);
                setCourses(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCourses();
    }, []);

    async function onSubmit(filters: z.infer<typeof FormSchema>) {
        setLoading(true);
        console.log(filters);
        const res = await axios.post('/api/usis/apply-course-filter', filters, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(res.data.data);
        setFilteredCourses(res.data.data);
        setLoading(false);
    }

    return (
        <div className="mt-0">
            <h1 className="text-center text-lg font-bold">Filter</h1>
            <h1 className="text-center text-xs">
                Filter out coureses or sections
            </h1>
            <div className="grid items-center gap-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="courses"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Courses</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={courses.map((course) => {
                                                return {
                                                    value: course,
                                                    label: course,
                                                };
                                            })}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select courses"
                                            variant="secondary"
                                            animation={0}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose your courses.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facultyInitials"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Faculties</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={faculties.map(
                                                (faculty) => {
                                                    return {
                                                        value: faculty,
                                                        label: faculty,
                                                    };
                                                },
                                            )}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select courses"
                                            variant="secondary"
                                            animation={0}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose the faculties you are interested
                                        in (not like that).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="days"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Day</FormLabel>

                                    <FormControl>
                                        <MultiSelect
                                            options={days}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select courses"
                                            variant="secondary"
                                            animation={0}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose the days you want to go to class.
                                        I hate Saturdays.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startTimes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={times}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select courses"
                                            variant="secondary"
                                            animation={0}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose the starting time of the class.
                                        8am classes are the best right?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant="secondary"
                            type="submit"
                            className="w-full">
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                'Apply Filters'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
