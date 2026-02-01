import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { createBrowserRouter } from "react-router-dom";
import {
    CreateRoomPage,
    HomePage,
    LeaderBoardPage,
    LoginPage,
    NotFoundPage,
    ProfilePage,
    RoomsPage,
    SettingsPage,
    SignUpPage,
    RacePage,
    TypePage,
} from "./pages/";
import { RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            {
                path: "leaderboard",
                element: <LeaderBoardPage />,
            },
            {
                path: "login",
                element: (
                    <AuthLayout authentication={false}>
                        <LoginPage />
                    </AuthLayout>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignUpPage />
                    </AuthLayout>
                ),
            },
            {
                path: "profile",
                element: (
                    <AuthLayout authentication={true}>
                        <ProfilePage />
                    </AuthLayout>
                ),
            },
            {
                path: "race/:roomId",
                element: (
                    <AuthLayout authentication={true}>
                        <RacePage />
                    </AuthLayout>
                ),
            },
            {
                path: "type",
                element: (
                    <AuthLayout authentication={true}>
                        <TypePage />
                    </AuthLayout>
                ),
            },
            {
                path: "create-room",
                element: (
                    <AuthLayout authentication={true}>
                        <CreateRoomPage />
                    </AuthLayout>
                ),
            },
            {
                path: "rooms",
                element: (
                    <AuthLayout authentication={true}>
                        <RoomsPage />
                    </AuthLayout>
                ),
            },
            {
                path: "settings",
                element: (
                    <AuthLayout authentication={true}>
                        <SettingsPage />
                    </AuthLayout>
                ),
            },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);