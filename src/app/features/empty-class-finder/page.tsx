'use client';  // Ensures it's a client-side component

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FilterType } from '../class-schedule/components/course-info';
import { CourseInfoType } from '@/types/usisReponse.type';

type TimeSlot = {
  start: string;
  end: string;
};

type RoomAvailability = {
  roomNumber: string;
  availability: { [time: string]: boolean }; // true = free, false = occupied
};

// Convert 24-hour time to 12-hour format with AM/PM
const formatTime = (hour: number, minutes: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHour}:${formattedMinutes} ${period}`;
};

// Generate time slots for the test data within a defined range
const generateTimeSlots = () => {
  const slots: TimeSlot[] = [];
  let startHour = 8;
  let startMinutes = 0;

  for (let i = 0; i < 8; i++) { // 8 slots for a standard day
    const formattedStart = formatTime(startHour, startMinutes);
    const endMinutes = startMinutes + 80; // 1 hour 20 min class
    const endHour = startHour + Math.floor(endMinutes / 60);
    const endMinutesMod = endMinutes % 60;
    const formattedEnd = formatTime(endHour, endMinutesMod);
    
    slots.push({ start: formattedStart, end: formattedEnd });

    // Advance time by 1 hour 30 mins (1hr 20mins class + 10 min break)
    startMinutes += 90;
    if (startMinutes >= 60) {
      startHour += Math.floor(startMinutes / 60);
      startMinutes %= 60;
    }
  }

  return slots;
};

const timeSlots = generateTimeSlots();

export default function EmptyClassFinder() {
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [freeRooms, setFreeRooms] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [roomAvailabilities, setRoomAvailabilities] = useState<RoomAvailability[]>([]);
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to get room availability and room options from API
  useEffect(() => {
    async function getRoomData() {
      setIsLoading(true);
      try {
        const res = await axios.post('/api/usis/class-schedule', filters);
        console.log('API Response:', res.data); // Debugging line to inspect API response
        const { roomAvailabilities, roomOptions } = res.data;
        setRoomAvailabilities(roomAvailabilities || []);
        setRoomOptions(roomOptions || []); // Ensure this is an array of room numbers
      } catch (error) {
        console.error('Error fetching room data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getRoomData();
  }, [filters]);

  const handleSearch = () => {
    // Clear previous results
    setFreeRooms([]);
    setResult('');

    if (selectedRoomNumber && selectedTime) {
      // If both room number and time are selected
      const [startTime, endTime] = selectedTime.split(' - ');

      const room = roomAvailabilities.find(r => r.roomNumber === selectedRoomNumber);
      if (room) {
        const isFree = room.availability[`${startTime} - ${endTime}`];
        setResult(isFree ? `Room ${selectedRoomNumber} is free at ${startTime} - ${endTime}` : `Room ${selectedRoomNumber} is occupied at ${startTime} - ${endTime}`);
      } else {
        setResult('Room number not found.');
      }
    } else if (selectedRoomNumber) {
      // If only room number is selected, show when it is free
      const room = roomAvailabilities.find(r => r.roomNumber === selectedRoomNumber);
      if (room) {
        const availableTimes = timeSlots
          .map(slot => `${slot.start} - ${slot.end}`)
          .filter(slot => room.availability[slot]);

        if (availableTimes.length > 0) {
          setResult(`Room ${selectedRoomNumber} is free at the following times: ${availableTimes.join(', ')}`);
          setFreeRooms(availableTimes);
        } else {
          setResult('Room is occupied all day.');
        }
      } else {
        setResult('Room number not found.');
      }
    } else if (selectedTime) {
      // If only time is selected, show all free rooms at that time
      const [startTime, endTime] = selectedTime.split(' - ');

      const freeRoomsAtTime = roomAvailabilities
        .filter(room => room.availability[`${startTime} - ${endTime}`])
        .map(room => room.roomNumber);

      if (freeRoomsAtTime.length > 0) {
        setResult(`Rooms free at ${selectedTime}:`);
        setFreeRooms(freeRoomsAtTime);
      } else {
        setResult(`No rooms are free at ${selectedTime}.`);
      }
    } else {
      setResult('Please select a room number or a time slot.');
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5">Empty Classroom Finder</h1>

      <select
        value={selectedRoomNumber || ''}
        onChange={(e) => setSelectedRoomNumber(e.target.value)}
        className="mb-3 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Room Number</option>
        {Array.isArray(roomOptions) && roomOptions.map((room, index) => (
          <option key={index} value={room}>
            {room}
          </option>
        ))}
      </select>

      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="mb-3 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Time Slot</option>
        {timeSlots.map((slot, index) => (
          <option key={index} value={`${slot.start} - ${slot.end}`}>
            {`${slot.start} - ${slot.end}`}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Check Availability
      </button>

      {isLoading && <p className="mt-5 text-lg">Loading...</p>}
      {result && <p className="mt-5 text-lg">{result}</p>}

      {/* Display free rooms/times in a grid if applicable */}
      {freeRooms.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-4">
          {freeRooms.map((roomOrTime, index) => (
            <div key={index} className="border border-gray-300 p-3 text-center rounded">
              {roomOrTime}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
