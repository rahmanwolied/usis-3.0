import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword) 
		console.log(showPassword)
	};
	return (
		<div className={`relative w-full rounded-md border border-input ring-offset-background`}>
			<input
				type={showPassword ? 'text' : 'password'}
				className={cn(
					'flex h-10 w-full bg-card px-3 rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
			<Button className='absolute right-0 top-0' variant="ghost" type="button" onClick={togglePasswordVisibility}>
				{showPassword ? <FaEyeSlash /> : <FaEye />}
			</Button>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
