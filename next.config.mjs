/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// remotePatterns: ['lh3.googleusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
