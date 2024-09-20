'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_KEY = 'AIzaSyDLcmUiq7FfA9C9Yb7SYhTRdnaEGjoKn00'; // Replace with your API key
const SHEET_ID = '1IfxY7GOSX22sVN80aq_QccT515ImBSEcPDfGST8mEPA'; // Replace with your sheet ID


interface Faculty {
    initial: string;
    name: string;
    email: string;
    consultationSlots: { day: string, time: string }[];
}

const FacultyConsultation: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [facultyData, setFacultyData] = useState<Faculty | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchFacultyData = async () => {
        try {
            setLoading(true);
            setFacultyData(null);

            // Fetch faculty details from the FacultyList (including URL in Column A and Initial in Column B)
            const facultyListResponse = await axios.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/FacultyList!A1:F1000?key=${API_KEY}`
            );
            const facultyListData = facultyListResponse.data.values;

            // Find the faculty row based on the initial entered in search
            const facultyRow = facultyListData.find((row: string[]) => row[1]?.toLowerCase() === searchTerm.toLowerCase());

            if (!facultyRow) {
                alert('Faculty not found');
                setLoading(false);
                return;
            }

            const facultyRoutineUrl = facultyRow[0]; // Routine URL or identifier in Column A
            const initial = facultyRow[1]; // Initials in Column B
            const name = facultyRow[2];    // Name in Column C
            const email = facultyRow[5];   // Email in Column F

            // Fetch routine for the specific faculty using the URL or identifier from Column A
            const routineResponse = await axios.get(
                `${facultyRoutineUrl}=${API_KEY}`
            );


            const routine = routineResponse.data.values;
            console.log(routine);
            // Find consultation slots dynamically in the routine
            const consultationSlots = findConsultationSlots(routine);

            // Set faculty data with consultation slots
            setFacultyData({ initial, name, email, consultationSlots });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching faculty data:', error);
            setLoading(false);
        }
    };

    // Function to dynamically find consultation slots based on 'Consultation' in the routine
    const findConsultationSlots = (routine: string[][]) => {
        const consultationSlots: { day: string, time: string }[] = [];

        let days = routine[0]; // Assuming the first row contains the days of the week (e.g., 'Monday', 'Tuesday', etc.)

        // Iterate over the rows to find consultation slots
        for (let i = 1; i < routine.length; i++) {
            const row = routine[i];
            row.forEach((cell, index) => {
                if (cell.toLowerCase().includes('consultation')) {
                    const day = days[index]; // The day of the consultation
                    const time = row[0];     // Assuming time is in the first column
                    consultationSlots.push({ day, time });
                }
            });
        }

        return consultationSlots;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl mb-4">Faculty Consultation Hours</h1>

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Enter faculty initial (e.g., ABW)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-full mr-2"
                />
                <Button onClick={fetchFacultyData} className="p-2 bg-blue-500 text-white rounded">Search</Button>
            </div>

            {loading && <p>Loading...</p>}

            {facultyData && (
                <div>
                    <FacultyCard faculty={facultyData} />
                </div>
            )}
        </div>
    );
};

const FacultyCard: React.FC<{ faculty: Faculty }> = ({ faculty }) => {
    return (
        <Card className="shadow-lg rounded-lg border p-4">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{faculty.name} ({faculty.initial})</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Email: {faculty.email}</p>
                <ul className="list-disc ml-4">
                    {faculty.consultationSlots.map((slot, index) => (
                        <li key={index}>{slot.day}: {slot.time}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default FacultyConsultation;