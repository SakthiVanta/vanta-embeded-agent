import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/web.tsx'],
    format: ['iife'],
    globalName: 'Vanta',
    splitting: false,
    sourcemap: true,
    clean: true,
    platform: 'browser',
    minify: true,
    outDir: 'dist/web',
    // Bundle React and ReactDOM
    noExternal: ['react', 'react-dom'],
})
