'use client';

import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; 

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
    { semesterName: '', courses: [{ name: '', grade: 0, credit: 3 }] }, 
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

 



  const handleSemesterChange = (index: number, value: string) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index].semesterName = value;
    setSemesters(updatedSemesters);
  };


  const isDuplicateCourse = (semesterIndex: number, courseName: string, courseIndex?: number) => {
    if (!courseName.trim()) {
  
      return false;
    }
  
    const courses = semesters[semesterIndex].courses;
    return courses.some((course, index) => course.name.toLowerCase() === courseName.toLowerCase() && index !== courseIndex);
  };

  const handleCourseChange = (
    semesterIndex: number,
    courseIndex: number,
    field: keyof Course,
    value: string | number
  ) => {
    const updatedSemesters = [...semesters];
    const courseName = field === 'name' ? (value as string).toLowerCase() : updatedSemesters[semesterIndex].courses[courseIndex].name.toLowerCase();
  
    if (!updatedSemesters[semesterIndex].semesterName.trim()) {
      setErrorMessage('Please enter a semester name before adding courses.');
      return;
    }
  
    if (field === 'name' && isDuplicateCourse(semesterIndex, courseName, courseIndex)) {
      setErrorMessage(`The course "${courseName}" is already in ${semesters[semesterIndex].semesterName}.`);
      return;
    }
  
    setErrorMessage(null);   
       if (field === 'name' || field === 'grade' || field === 'credit') {
      updatedSemesters[semesterIndex].courses[courseIndex][field] = value as never;
    }
  
    setSemesters(updatedSemesters);
  };


  const addSemester = () => {
    setSemesters([
      ...semesters,
      { semesterName: '', courses: [{ name: '', grade: 0, credit: 3 }] },
    ]);
  };

  // Add a new course
  const addCourse = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    if (!updatedSemesters[semesterIndex].semesterName.trim()) {
      setErrorMessage('Please enter a semester name before adding courses.');
      return;
    }
  
    updatedSemesters[semesterIndex].courses.push({
      name: '',
      grade: 0,
      credit: 3, 
    });
    setErrorMessage(null); 
    setSemesters(updatedSemesters);
  };

  
  const deleteCourse = (semesterIndex: number, courseIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.splice(courseIndex, 1);
    setSemesters(updatedSemesters);
  };

  
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


    Object.values(courseTracker).forEach((course) => {
      totalGradePoints += course.grade * course.credit;
      totalCredits += course.credit;
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    return { cgpa, totalCredits };
  };


  const calculateTotalCreditsAttempted = () => {
    let totalCreditsAttempted = 0;
    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        totalCreditsAttempted += course.credit;
      });
    });
    return totalCreditsAttempted;
  };

  const { cgpa, totalCredits } = calculateCGPA();
  const totalCreditsAttempted = calculateTotalCreditsAttempted();

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-bold mb-4">CGPA Calculator</h1>

      {errorMessage && (
        <div className="text-red-500 text-center mb-4">
          {errorMessage}
        </div>
      )}

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
            <div key={courseIndex} className="flex gap-2 mb-2 items-center">
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
                value={course.credit || 3} 
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
              <FaTrashAlt
                onClick={() => deleteCourse(semesterIndex, courseIndex)}
                className="text-red-500 cursor-pointer"
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
        <h2 className="text-center text-lg font-bold">Total Credits Earned: {totalCredits}</h2>
        <h2 className="text-center text-lg font-bold">Total Credits Attempted: {totalCreditsAttempted}</h2>
      </div>
    </div>
  );
}
