import React, { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        // Implement login logic here
        // This could involve calling an API endpoint or using a library like next-auth
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
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
            />

            <button type="submit" className="mt-4">Log In</button>
        </form>
    );
}
