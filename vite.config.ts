import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      exclude: [/node_modules/, /app\/gql\//],
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: [
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
})
