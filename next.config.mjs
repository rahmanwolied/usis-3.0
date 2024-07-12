/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// remotePatterns: ['lh3.googleusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '80',
				pathname: '/',
			},
		],
	},
};

export default nextConfig;
