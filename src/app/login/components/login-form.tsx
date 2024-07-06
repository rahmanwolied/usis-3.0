import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

    const handleSubmit = async (event: any) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
            />

            <label htmlFor="password">Password:</label>
            <div className="flex items-center border p-2 rounded">
                <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1"
                />
                 

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <button type="submit" className="mt-4">Log In</button>
        </form>
    );
}