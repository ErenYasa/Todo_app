import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3003,
      open: true,
      host: true,
    },
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@store': path.resolve(__dirname, './src/store/'),
        '@hooks': path.resolve(__dirname, './src/hooks/'),
        '@helpers': path.resolve(__dirname, './src/helpers/'),
        '@utils': path.resolve(__dirname, './src/utils/'),
        '@services': path.resolve(__dirname, './src/services/'),
        '@layout': path.resolve(__dirname, './src/layout/'),
        '@views': path.resolve(__dirname, './src/views/'),
        '@routes': path.resolve(__dirname, './src/routes/'),
      },
    },
  });
};
