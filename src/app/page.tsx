'use client';
import UsisSDK from '@/services/usisSDK';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		const usisSDK = new UsisSDK();
		usisSDK.getAcdemicSession('2022', 'Spring').then(console.log);
		usisSDK.getClassSchedule().then(console.log);
	}, []);

	return <main className="flex min-h-screen flex-col items-center justify-between p-24">Hello World</main>;
}
