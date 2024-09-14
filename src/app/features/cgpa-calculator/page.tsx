'use client';

import { useState } from 'react';

type Course = {
  name: string;
  grade: number;
  credit: number;
};

type Semester = {
  semesterName: string;
  courses: Course[];
};

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { semesterName: '', courses: [{ name: '', grade: 0, credit: 3 }] }, // Default credit is 3
  ]);

  // BRAC University Grading System
  const gradingScale: { [key: string]: number } = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    D: 1.0,
    F: 0.0,
  };

  // Handle changes for semester name
  const handleSemesterChange = (index: number, value: string) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index].semesterName = value;
    setSemesters(updatedSemesters);
  };

  // Handle changes for course details
  const handleCourseChange = (
    semesterIndex: number,
    courseIndex: number,
    field: keyof Course,
    value: string | number
  ) => {
    const updatedSemesters = [...semesters];
    const courseName = field === 'name' ? (value as string).toLowerCase() : updatedSemesters[semesterIndex].courses[courseIndex].name.toLowerCase();

    // Update the course data in the current semester
    if (field === 'name' || field === 'grade' || field === 'credit') {
      updatedSemesters[semesterIndex].courses[courseIndex][field] = value as never;
    }

    setSemesters(updatedSemesters);
  };

  // Add a new semester
  const addSemester = () => {
    setSemesters([
      ...semesters,
      { semesterName: '', courses: [{ name: '', grade: 0, credit: 3 }] }, // Default credit is 3
    ]);
  };

  // Add a new course
  const addCourse = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push({
      name: '',
      grade: 0,
      credit: 3, // Default credit is 3
    });
    setSemesters(updatedSemesters);
  };

  // Calculate CGPA and total credits
  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    const courseTracker: { [key: string]: { grade: number; credit: number } } = {}; // Track courses for retakes

    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        const courseName = course.name.toLowerCase();
        // If course is retaken, update it with the latest grade
        courseTracker[courseName] = { grade: course.grade, credit: course.credit };
      });
    });

    // Now calculate CGPA based on tracked courses
    Object.values(courseTracker).forEach((course) => {
      totalGradePoints += course.grade * course.credit;
      totalCredits += course.credit;
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    return { cgpa, totalCredits };
  };

  const { cgpa, totalCredits } = calculateCGPA();

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-bold mb-4">CGPA Calculator</h1>

      {semesters.map((semester, semesterIndex) => (
        <div key={semesterIndex} className="mb-6">
          <input
            type="text"
            placeholder="Semester Name"
            value={semester.semesterName}
            onChange={(e) => handleSemesterChange(semesterIndex, e.target.value)}
            className="border rounded p-2 w-full mb-2"
          />
          {semester.courses.map((course, courseIndex) => (
            <div key={courseIndex} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) =>
                  handleCourseChange(semesterIndex, courseIndex, 'name', e.target.value)
                }
                className="border rounded p-2 flex-1"
              />
              <input
                type="number"
                placeholder="Grade Point (e.g. 4.0, 3.3)"
                value={course.grade}
                onChange={(e) =>
                  handleCourseChange(
                    semesterIndex,
                    courseIndex,
                    'grade',
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded p-2 flex-1"
              />
              <input
                type="number"
                placeholder="Credit"
                value={course.credit || 3} // Default credit is 3
                onChange={(e) =>
                  handleCourseChange(
                    semesterIndex,
                    courseIndex,
                    'credit',
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded p-2 flex-1"
              />
            </div>
          ))}

          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={() => addCourse(semesterIndex)}
          >
            Add Course
          </button>
        </div>
      ))}

      <button className="bg-green-500 text-white p-2 rounded mt-4" onClick={addSemester}>
        Add Semester
      </button>

      <div className="mt-6">
        <h2 className="text-center text-lg font-bold">Your CGPA: {cgpa}</h2>
        <h2 className="text-center text-lg font-bold">Total Credits: {totalCredits}</h2>
      </div>
    </div>
  );
}
