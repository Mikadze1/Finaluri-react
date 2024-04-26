import { useSelector } from "react-redux"

export const useCart = () => {
    const loading = useSelector((state) => state.cart.loading);

    const cartItems = useSelector((state) => state.cart.cartItems);

    const error = useSelector((state) => state.cart.error);

    return {
        loading,
        cartItems,
        error
    };
};