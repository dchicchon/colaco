// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/colaCo/',
    esbuild: {
        drop: ['console', 'debugger']
    },
    build: {
        minify: false,
        sourcemap: true // set to false for debug
    },
    plugins: [
        react(),
    ],
});