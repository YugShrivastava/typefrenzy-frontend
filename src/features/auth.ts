import axios from "axios";

const authLogin = async (credentials: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            credentials,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
};

const register = async (details: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/register`,
            details,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
};

const getUserData = async (token: string | null) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/verify`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response?.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
};

export { authLogin, getUserData, register };
