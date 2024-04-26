import { useSelector } from "react-redux"

export const useUser = () => {
    const userData = useSelector((state) => state.user.userData);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    return {
        userData,
        loading,
        error,
    };
};