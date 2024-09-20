"use client"; // Mark this file as a Client Component

import { useState, useEffect } from 'react';

// Simulating database fetch - should be replaced with actual DB fetching logic in the backend
const fetchRoomAvailabilities = async () => {
  return [
    {
      roomNumber: '7A-10C',
      availability: {
        '8:00 AM - 9:20 AM': true,
        '9:30 AM - 10:50 AM': false,
        '11:00 AM - 12:20 PM': true,
        '12:30 PM - 1:50 PM': false,
        '2:00 PM - 3:20 PM': true,
        '3:30 PM - 4:50 PM': false,
      },
    },
    {
      roomNumber: '12B-20L',
      availability: {
        '8:00 AM - 9:20 AM': false,
        '9:30 AM - 10:50 AM': true,
        '11:00 AM - 12:20 PM': false,
        '12:30 PM - 1:50 PM': false,
        '2:00 PM - 3:20 PM': true,
        '3:30 PM - 4:50 PM': false,
      },
    },
  ];
};

type RoomAvailability = {
  roomNumber: string;
  availability: { [time: string]: boolean };
};

const formatTime = (hour: number, minutes: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHour}:${formattedMinutes} ${period}`;
};

const generateTimeSlots = () => {
  const slots = [];
  let startHour = 8;
  let startMinutes = 0;

  for (let i = 0; i < 8; i++) {
    const formattedStart = formatTime(startHour, startMinutes);
    const endMinutes = startMinutes + 80; // 1 hour 20 min class
    const endHour = startHour + Math.floor(endMinutes / 60);
    const endMinutesMod = endMinutes % 60;
    const formattedEnd = formatTime(endHour, endMinutesMod);

    slots.push({ start: formattedStart, end: formattedEnd });

    startMinutes += 90;
    if (startMinutes >= 60) {
      startHour += Math.floor(startMinutes / 60);
      startMinutes %= 60;
    }
  }

  return slots;
};

const timeSlots = generateTimeSlots();

export default function EmptyClassFinderClient() {
  const [roomAvailabilities, setRoomAvailabilities] = useState<RoomAvailability[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [freeRooms, setFreeRooms] = useState<string[]>([]);
  const [result, setResult] = useState('');

  // Fetch room availabilities
  useEffect(() => {
    const fetchData = async () => {
      const availabilities = await fetchRoomAvailabilities();
      setRoomAvailabilities(availabilities);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    setFreeRooms([]);
    setResult('');

    if (selectedTime) {
      const [startTime, endTime] = selectedTime.split(' - ');

      const freeRoomsAtTime = roomAvailabilities
        .filter((room) => {
          const availability = room.availability[`${startTime} - ${endTime}`];
          return availability === true;
        })
        .map((room) => room.roomNumber);

      if (freeRoomsAtTime.length > 0) {
        setResult(`Rooms free at ${selectedTime}:`);
        setFreeRooms(freeRoomsAtTime);
      } else {
        setResult(`No rooms are free at ${selectedTime}.`);
      }
    } else {
      setResult('Please select a time slot.');
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-5 text-2xl font-bold">Empty Classroom Finder</h1>

      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="mb-3 rounded border border-gray-300 p-2"
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
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Check Availability
      </button>

      {result && <p className="mt-5 text-lg">{result}</p>}

      {freeRooms.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-4">
          {freeRooms.map((room, index) => (
            <div
              key={index}
              className="rounded border border-gray-300 p-3 text-center"
            >
              {room}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
