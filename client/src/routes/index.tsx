/* eslint-disable no-underscore-dangle */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';

const RootRedirect = lazyWithPreload(() => import('./components/RootRedirect'));
const AuthRoute = lazyWithPreload(() => import('./components/AuthRoute'));
const ProtectedRoute = lazyWithPreload(() => import('./components/ProtectedRoute'));

const Dashboard = lazyWithPreload(() => import('@/views/dashboard'));
const Welcome = lazyWithPreload(() => import('@/views/dashboard/partials/Welcome'));
const WorkSpace = lazyWithPreload(() => import('@/views/dashboard/partials/WorkSpace'));

const RegisterPage = lazyWithPreload(() => import('@views/auth/Register'));
const LoginPage = lazyWithPreload(() => import('@views/auth/Login'));
const ResetPasswordPage = lazyWithPreload(() => import('@/views/auth/ResetPassword'));
const NewPasswordPage = lazyWithPreload(() => import('@/views/auth/NewPassword'));

const ErrorPage = lazyWithPreload(() => import('@views/Error'));

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
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: 'work-space/:id',
          element: <WorkSpace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
