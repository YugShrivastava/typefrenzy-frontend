import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { getUserData } from "./features/auth";
import { MainLoader, Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    const [loading, setloading] = useState(true);
    const authStatus = useAuthStore((state: any) => state.authStatus);
    const login = useAuthStore((state: any) => state.login);
    const logout = useAuthStore((state: any) => state.logout);

    useEffect(() => {
        setloading(true);

        const token: string | null = localStorage.getItem("token")?.trim() || null;
        if (token !== null && token !== "") {
            getUserData(token)
                .then((res) => {
                    if (res?.error) logout();
                    else {
                        login(res);
                        console.log(res.username + " logged in");
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setloading(false)
                    console.log(authStatus)
                })
        } else {
            console.log("token not found");
            logout();
            setloading(false);
        }
    }, []);

    return loading ? (
        <MainLoader />
    ) : (
        <>
            <div className="px-10 md:px-40 lg:px-40 xl:px-50 2xl:px-60 w-full h-full flex flex-col items-center font-[poppins] bg-slate-900 min-h-screen text-white pb-30">
                <Navbar authStatus={authStatus} />
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
