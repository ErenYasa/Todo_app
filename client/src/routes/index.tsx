/* eslint-disable no-underscore-dangle */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';
import RegisterPage from '@/views/auth/Register';
import ResetPasswordPage from '@/views/auth/ResetPassword';
import NewPasswordPage from '@/views/auth/NewPassword';

const RootRedirect = lazyWithPreload(() => import('./components/RootRedirect'));
const AuthRoute = lazyWithPreload(() => import('./components/AuthRoute'));
const ProtectedRoute = lazyWithPreload(() => import('./components/ProtectedRoute'));

const LoginPage = lazyWithPreload(() => import('@views/auth/Login'));
const ErrorPage = lazyWithPreload(() => import('@views/Error'));

const Dashboard = lazyWithPreload(() => import('@views/Dashboard'));

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootRedirect />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: (
        <AuthRoute>
          <LoginPage />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/register',
      element: (
        <AuthRoute>
          <RegisterPage />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/reset-password',
      element: (
        <AuthRoute>
          <ResetPasswordPage />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/new-password',
      element: (
        <AuthRoute>
          <NewPasswordPage />
        </AuthRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
