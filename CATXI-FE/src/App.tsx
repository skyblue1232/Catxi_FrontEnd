import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/Chat';
import NotFoundPage from './pages/error';
import ChatLayout from './layouts/ChatLayout';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'chat',
        element: <ChatLayout />,
        children: [
          { index: true, element: <ChatPage /> }, // /chat
          // { path: ':roomId', element: <ChatRoomPage /> } // 추후 확장 가능
        ],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full bg-background min-h-screen font-pretendard">
        <RouterProvider router={router} />
      </div>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>    
  )
}

export default App;