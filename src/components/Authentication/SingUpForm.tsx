import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../features/auth";
// import useAuthStore from "../../store/authStore";
import { ButtonLoader } from "../";

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        formData.username = formData.username?.trim();
        formData.email = formData.email?.trim();
        formData.password = formData.password?.trim();

        if (!formData.username.trim()) {
            toast.info("Username must not be empty!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
            return;
        }
        if (!formData.email.trim()) {
            toast.info("Email must not be empty!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
            return;
        }
        if (!formData.password.trim()) {
            toast.info("Password must not be empty!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setLoading(false);
            return;
        }

        const response = await register(formData);

        if (response?.error) {
            toast.error(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);

            return;
        }
        setLoading(false);

        toast.success(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate("/login");
    };

    return (
        <div className="w-full lg:w-3/4 2xl:w-4/9 xl:w-3/5 scale-105 mt-20 px-15 py-20 backdrop-blur-xl bg-slate-800/60 border border-slate-700 rounded-2xl shadow-xl text-white">
            <h2 className="text-3xl font-semibold text-sky-400 mb-10 text-center">
                Sign up
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-lg text-slate-300 mb-1">
                        Username
                    </label>
                    <input
                        required
                        value={formData.username}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="Enter a username"
                        className="w-full px-4 py-2 rounded-lg bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label className="block text-lg text-slate-300 mb-1">
                        Email
                    </label>
                    <input
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 rounded-lg bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label className="block text-lg text-slate-300 mb-1">
                        Password
                    </label>
                    <input
                        required
                        value={formData.password}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                <button
                    type="submit"
                    className="cursor-pointer mt-2 w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold rounded-lg transition text-lg"
                >
                    {loading ? <ButtonLoader /> : "Sign up"}
                </button>
            </form>

            <p className="text-sm text-center text-slate-500 mt-6">
                Already have an account?
                <Link
                    to={"/login"}
                    className="cursor-pointer text-sky-400 hover:underline pl-1"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUpForm;
