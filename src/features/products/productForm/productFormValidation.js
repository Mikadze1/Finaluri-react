import * as yup from "yup";

export const productFormValidationSchema = yup.object({
    name: yup
        .string()
        .required("Product name is required")
        .min(3, "Product name should have at least 3 characters"),
    description: yup
        .string()
        .required("Product description is required")
        .min(3, "Product description should have at least 3 characters"),
    brand: yup
        .string()
        .required("Product brand is required")
        .min(3, "Product brand should have at least 3 characters"),
    category: yup
        .string()
        .required("Product category is required")
        .min(3, "Product category should have at least 3 characters"),
    price: yup.number().min(1, "Product price should be at least 1").required(),
    image: yup.string().required("Product image is required")  
});