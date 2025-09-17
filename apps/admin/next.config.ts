import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	env: {
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
	},

};

export default nextConfig;
