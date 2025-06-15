import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomeLayout from "./layouts/HomeLayout";
import ChatPage from "./pages/Chat";
// import NotFoundPage from "./pages/error";
import ChatLayout from "./layouts/ChatLayout";
import { Login } from "./pages/Login";
import SignIn from "./pages/SiginIn";
import CreateChat from "./pages/CreateChat";
import MyPage from "./pages/MyPage";
import Redirection from "./pages/Redirect";
import HomePage from "./pages/Home";
import { AuthCheck } from "./utils/authCheck";
import GlobalErrorPage from "./layouts/GlobalErrorPage";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: <Login />, handle: { isPublic: true } },
      {
        path: "chat/:roomId",
        loader: AuthCheck.authPageCheck,
        element: <ChatLayout />,
        children: [
          { index: true, element: <ChatPage /> }, // /chat
          // { path: ':roomId', element: <ChatRoomPage /> } // 추후 확장 가능
        ],
      },
      { path: "home", element: <HomePage />, loader: AuthCheck.authPageCheck },
      {
        path: "signIn",
        element: <SignIn />,
        handle: { isPublic: true },
        loader: AuthCheck.authPageCheck,
      },
      {
        path: "createChat",
        element: <CreateChat />,
        loader: AuthCheck.authPageCheck,
      },
      { path: "myPage", element: <MyPage />, loader: AuthCheck.authPageCheck },
      {
        path: "callback/kakao",
        element: <Redirection />,
        handle: { isPublic: true },
      },
    ],
  },
]);

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
        <RouterProvider router={publicRoutes} />
      </div>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
