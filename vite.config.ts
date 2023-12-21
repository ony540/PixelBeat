import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import removeConsole from 'vite-plugin-remove-console'
import tsconfigpaths from 'vite-tsconfig-paths' // tsconfig의 paths를 적용시켜주는 플러그인

export default defineConfig({
  plugins: [react(), removeConsole(), tsconfigpaths()]
})
