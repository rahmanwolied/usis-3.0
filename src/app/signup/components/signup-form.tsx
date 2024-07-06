import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Step 1: Import icons

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const [formData, setFormData] = useState({ /* form fields state */ });

    const handleSubmit = async (event:any) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetch('/api/users/signup', { // Adjust the path if necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Handle success
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    // Update formData based on form changes
    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-center text-2xl font-bold my-10">USIS 3.0 Signup</h1>
                <nav className="border-sky-400 p-4 shadow rounded"> {/* Updated border color */}
                    <form className="flex flex-col gap-3 items-center">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" className="border p-2 rounded" onChange={handleChange} />
    
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" className="border p-2 rounded" onChange={handleChange}/>
    
                        <label htmlFor="password">Password:</label>
                        <div className="flex items-center border p-2 rounded">
                            <input type={showPassword ? "text" : "password"} id="password" name="password" className="flex-1" onChange={handleChange} />
                            <button type="button" onClick={togglePasswordVisibility} className="ml-2">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
    
                        <Button onClick={handleSubmit}>Sign Up</Button>
                    </form>
                </nav>
            </div>
        </div>
    );
}