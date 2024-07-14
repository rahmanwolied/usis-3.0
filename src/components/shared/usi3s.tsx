export function USI3S({ variant = 'medium' }: { variant?: 'large' | 'medium' | 'small' }) {
	if (variant === 'large') {
		return (
			<div className="text-9xl font-bold text-slate-800">
				<Logo />
			</div>
		);
	} else if (variant === 'medium') {
		return (
			<div className="text-6xl font-bold text-slate-800">
				<Logo />
			</div>
		);
	}
	return (
		<div className="text-3xl font-bold text-slate-800">
			<Logo />
		</div>
	);
}

function Logo() {
	return (
		<>
			U<span className="text-blue-500">3</span>IS
		</>
	);
}

USI3S.displayName = 'USI3S';
