import Image from 'next/image';
import Link from 'next/link';
import {
    BookOpen,
    Calendar,
    ChevronRight,
    GraduationCap,
    MessageCircle,
    Star,
} from 'lucide-react';
import { FaGraduationCap } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <main>
                <section className="relative flex min-h-[calc(100vh_-_4rem)] items-center justify-center overflow-hidden py-20 text-center">
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/10 to-background"
                        style={{ height: '150%' }}
                    />
                    <div className="z-10">
                        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                            Welcome to{' '}
                            <span className="text-primary">USIS 3.0</span>
                        </h1>
                        <p className="mx-auto mt-3 max-w-md text-xl text-muted-foreground sm:text-2xl md:mt-5 md:max-w-3xl">
                            Your all-in-one university student information
                            system
                        </p>
                        <div className="mt-10 flex justify-center space-x-4">
                            <Button size="lg" variant="default">
                                Get Started
                            </Button>
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-12 text-center text-4xl font-extrabold">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                {
                                    title: 'Course Management',
                                    icon: BookOpen,
                                    description:
                                        'Easily manage your courses and schedules',
                                },
                                {
                                    title: 'Degree Tracking',
                                    icon: FaGraduationCap,
                                    description:
                                        'Track your progress towards your degree',
                                },
                                {
                                    title: 'Communication Hub',
                                    icon: MessageCircle,
                                    description:
                                        'Stay connected with classmates and faculty',
                                },
                            ].map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <feature.icon className="mb-4 h-12 w-12 text-primary" />
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="previews" className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-12 text-center text-3xl font-extrabold">
                            App Previews
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Degree Tracking</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Degree Tracking Preview"
                                        width={300}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                    <p className="mt-4 text-gray-600">
                                        Visualize your academic progress and
                                        plan your path to graduation.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chat Rooms</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Chat Rooms Preview"
                                        width={300}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                    <p className="mt-4 text-gray-600">
                                        Collaborate with classmates in
                                        course-specific chat rooms.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Suggestions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Course Suggestions Preview"
                                        width={300}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                    <p className="mt-4 text-gray-600">
                                        Get personalized course recommendations
                                        based on your academic goals.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="resources" className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-12 text-center text-3xl font-extrabold">
                            Resources for Everyone
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                {
                                    title: 'View Course Schedules',
                                    icon: Calendar,
                                    description:
                                        'Browse available courses and their schedules',
                                },
                                {
                                    title: 'Course & Faculty Reviews',
                                    icon: Star,
                                    description:
                                        'Read and write reviews for courses and faculty members',
                                },
                                {
                                    title: 'Important Links & Dates',
                                    icon: ChevronRight,
                                    description:
                                        'Access key university resources and academic calendar',
                                },
                            ].map((resource, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <resource.icon className="mb-4 h-12 w-12 text-primary" />
                                        <CardTitle>{resource.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            {resource.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="link" className="mt-4">
                                            Learn More
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
