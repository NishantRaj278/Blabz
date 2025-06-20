import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './routes/Homepage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import WritePostPage from './routes/WritePostPage.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ToastContainer } from 'react-toastify';

import { ClerkProvider } from '@clerk/clerk-react'

const queryClient = new QueryClient();


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout.jsx'

let router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/write",
        element: <WritePostPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />
      }

    ]
  }
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
);