import netlify from '@netlify/vite-plugin'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import tsconfigPaths from 'vite-tsconfig-paths'

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
    netlifyReactRouter(),
    netlify(),
  ],
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ['react-chatbotify'],
  },
})
