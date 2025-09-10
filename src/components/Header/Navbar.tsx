import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DefaultAvatar from "../../assets/user2.png";
import useAuthStore from "../../store/authStore";

function Navbar({ authStatus }: any) {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const logout = useAuthStore((state: any) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        logout();
        navigate("/");
    };

    const navLinks = [
        { url: "/", name: "Home", place: true },
        { url: "/login", name: "Login", place: !authStatus },
        { url: "/signup", name: "Sign up", place: !authStatus },
        { url: "/rooms", name: "Rooms", place: authStatus },
        { url: "/create-room", name: "Create Room", place: authStatus },
        { url: "/leaderboard", name: "Leaderboard", place: true },
    ];

    return (
        <div className="w-full pt-5 pb-10 flex justify-between gap-10 items-center">
            <Link
                to={"/"}
                className="cursor-pointer text-5xl font-[rajdhani] font-bold bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
                TypeFrenzy
            </Link>
            <nav className="flex gap-5 text-xl">
                {navLinks.map(
                    (link) =>
                        link.place && (
                            <NavLink
                                to={link.url}
                                key={link.url}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-sky-400"
                                        : "hover:text-sky-400"
                                }
                            >
                                {link.name}
                            </NavLink>
                        )
                )}
                {authStatus && (
                    <div className=" ">
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!isProfileOpen)}
                                className="flex items-center text-neutral-700 hover:text-black transition focus:outline-none hover:underline"
                            >
                                <img
                                    src={DefaultAvatar}
                                    className="w-8 ml-3"
                                    alt="avatar"
                                />
                                <svg
                                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                                        isProfileOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="white"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute mt-2 w-30 bg-slate-800 rounded-md shadow-lg py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700 hover:text-white"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to={"/settings"}
                                        className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700 hover:text-white"
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 text-left py-2 text-sm text-orange-400 hover:bg-slate-700 hover:text-red-500"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
