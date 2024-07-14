import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const res = await axios.post('/api/users/login', {
			email,
			password,
		});
		console.log(res);
	};

	return (
		<>
			<h2 className="text-center font-bold text-2xl mb-4">Usis 3.0 Login</h2>
			<form className="flex flex-col gap-3">
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />

				<label htmlFor="password">Password:</label>
				<div className="flex items-center border p-2 rounded">
					<input
						type={showPassword ? 'text' : 'password'} // Toggle between text and password
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="flex-1"
					/>

					<button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>

				<Button onClick={handleSubmit} className="mt-4">
					Log In
				</Button>
			</form>
		</>
	);
}
