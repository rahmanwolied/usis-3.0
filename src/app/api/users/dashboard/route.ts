import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/model/User';  // Import the User model
import { CourseModel } from '@/model/Course';  // Import the Course model

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
    await dbConnect();
    const { email } = await req.json();
    console.log(email)
    try {
        // Fetch the user's advised courses

        const user = await UserModel.findOne({ email }).lean();
        console.log(user);
        if (!user || !user.advisedCourses) {
            return NextResponse.json({ error: 'No advised courses found' });
        }

        const advisedCourses = user.advisedCourses;

        // Collect the course and section details
        const coursesWithSections = await Promise.all(
            advisedCourses.map(async (course) => {
                const courseData = await CourseModel.findOne({
                    code: course.code,
                    'sections.section': course.section
                }).lean();

                if (courseData) {
                    const section = courseData.sections.find((sec) => sec.section === course.section);
                    return {
                        code: courseData.code,
                        title: courseData.title,
                        faculty: section?.facultyName,
                        section: section?.section,
                        lab: section?.lab
                    };
                }
                return null;
            })
        );

        // Fetch the completed credits from grades
        const completedCredits = user.grades.reduce((acc, grade) => acc + parseFloat(grade.creditEarned), 0);

        return NextResponse.json({
            currentCourses: coursesWithSections.filter(Boolean),
            completedCredits
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the data' });
    }
}
