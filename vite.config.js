// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log({ command, mode })

    // if (mode === 'production') {
    return {
        base: '/colaco/',
        plugins: [react()]
    }
    // }
    // return {
    //     plugins: [react()]
    // }
});
