import { useEffect, useState } from "react";
import { MainLoader } from "../components";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function AuthLayout({ children, authentication = true }: any) {
    const authStatus = useAuthStore((state: any) => state.authStatus);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === null) setLoading(true);
        else {
            if (authentication && authStatus !== authentication)
                navigate("/login");
            else if (!authentication && authStatus !== authentication)
                navigate("/");

            setLoading(false);
        }
    }, [authStatus]);

    if (loading) return <MainLoader />;
    return <>{children}</>;
}

export default AuthLayout;
