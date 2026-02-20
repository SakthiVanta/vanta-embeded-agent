import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/web.tsx'],
    format: ['iife'],
    globalName: 'Vanta',
    splitting: false,
    sourcemap: false,
    clean: true,
    platform: 'browser',
    minify: true,
    outDir: 'dist/web',
    metafile: true,
    // Bundle React and ReactDOM using Preact compat to keep the bundle lightweight
    noExternal: ['react', 'react-dom'],
    esbuildOptions(options) {
        options.alias = {
            ...options.alias,
            'react': 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime'
        };
    },
})
