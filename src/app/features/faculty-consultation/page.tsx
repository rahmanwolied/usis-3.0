"use client"; // Enable client-side rendering

import React, { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import * as XLSX from 'xlsx';

// URL for the published XLSX file (replace with your own)
const XLSX_URL = 'https://example.com/your-file.xlsx';  // Replace this with your published XLSX link

// Helper function to fetch and parse XLSX data
const fetchXLSXData = async (url: string): Promise<any[][]> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
};

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Search by sheet name (faculty initials)
    const [results, setResults] = useState<{ day: string; time: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                setLoading(true);
                setError('');

                try {
                    const sheetData = await fetchXLSXData(XLSX_URL);

                    if (!sheetData || sheetData.length === 0) {
                        setResults([]);
                        return;
                    }

                    const consultationHours: { day: string; time: string }[] = [];

                    // Loop through days (rows 9 to 15)
                    for (let i = 9; i <= 15; i++) {
                        // Loop through time slots (columns B to J)
                        for (let j = 1; j <= 9; j++) {
                            if (sheetData[i][j] === 'Consultation') {
                                consultationHours.push({
                                    day: sheetData[i][0], // Column A (days of the week)
                                    time: sheetData[8][j], // Row 8 (time slots)
                                });
                            }
                        }
                    }

                    setResults(consultationHours);
                } catch (error) {
                    setError('Error fetching data from the spreadsheet');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search by Faculty Initial (e.g., ABY)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                style={{ padding: '10px', fontSize: '16px', width: '100%' }}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {results.length > 0 ? (
                <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', marginTop: '20px' }}>
                    {results.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{item.day}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <p>{item.time}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                !loading && searchTerm && <p>No consultation hours found for "{searchTerm}".</p>
            )}
        </div>
    );
};

export default App;
