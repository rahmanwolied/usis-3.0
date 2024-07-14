export function USI3S({ variant = 'medium' }: { variant?: 'large' | 'medium' | 'small' }) {
	if (variant === 'large') {
		return (
			<div className="text-9xl">
				<Logo />
			</div>
		);
	} else if (variant === 'medium') {
		return (
			<div className="text-6xl">
				<Logo />
			</div>
		);
	}
	return (
		<div className="text-3xl">
			<Logo />
		</div>
	);
}

function Logo() {
	return (
		<h1 className="font-bold">
			U<span className="text-blue-500">3</span>IS
		</h1>
	);
}

USI3S.displayName = 'USI3S';
