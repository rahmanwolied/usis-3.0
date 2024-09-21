'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type CurrentCourse = {
  code: string;
  facultyName: string;
  faculty: string;
  section: string;
  days: string[];
  startTimes: string[];
  endTimes: string[];
  roomNumber: string;
};



export default function Component() {
  const [currentCourses, setCurrentCourses] = useState<CurrentCourse[]>([]); // Add the type here
  const [completedCredits, setCompletedCredits] = useState(0);
  const totalCredits = 136;
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post('/api/users/dashboard', {
          email: session?.user.email,
        });
        setCurrentCourses(res.data.currentCourses); // Match advised courses with section details
        setCompletedCredits(res.data.completedCredits); // Fetch completed credits
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [session?.user?.email]);



  return (
    <div className="container mx-auto space-y-8 p-4">
      {/* Degree Progression */}
      <Card>
        <CardHeader>
          <CardTitle>Your Degree Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${(completedCredits / totalCredits) * 100}%`,
              }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {completedCredits} out of {totalCredits} credits
            completed
          </p>
        </CardContent>
      </Card>

      {/* Currently Doing Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Currently Doing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {currentCourses &&
              currentCourses.map((course, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-medium">
                      {course.code}
                    </span>
                    <span className="text-muted-foreground">
                      {course.section}
                    </span>
                    <span className="text-muted-foreground">
                      {course.faculty}
                    </span>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>



    </div>
  );
}
