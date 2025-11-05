import TasksPage from 'pages/TasksPage/TasksPage';
import { AppRoutes } from './config';
import { AuthLayout, MainLayout } from 'layouts';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { ProtectedRoute, PublicRoute } from './components';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { KanbanPage } from 'pages/KanbanPage/KanbanPage';
import { TaskDetailsPage } from 'pages/TaskDetailsPage/TaskDetailsPage';

const APP_ROUTES: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: AppRoutes.TASKS,
            element: <TasksPage />,
          },
          {
            path: AppRoutes.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: AppRoutes.KANBAN,
            element: <KanbanPage />,
          },
          {
            path: AppRoutes.TASK_DETAILS,
            element: <TaskDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: AppRoutes.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: AppRoutes.LOGIN,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
];

export const appRouter = createBrowserRouter(APP_ROUTES);
