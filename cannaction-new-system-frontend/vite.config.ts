import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		strictPort: true,
		port: 3002,
		host: true
	},
	plugins: [react()],
	define: {
		'process.env': process.env,
		global: {},
	},
	optimizeDeps: {
		include: ['@mui/material', '@tanstack/react-query'],
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/],
		},
	},
	preview: {
		allowedHosts: ['*'],
	},
});
