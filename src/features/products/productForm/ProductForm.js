import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { productFormValidationSchema } from "./productFormValidation";
import {
  Button,
  FormContainer,
  Input,
  Text,
} from "../../../components/atoms/index";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import {
  saveProduct,
  setSelectedProduct,
} from "../../../redux/slices/productSlice";
import { FormPageContainer } from "../../../components/atoms/FormContainer";
import { useProduct } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productFormValidationSchema),
    mode: "onChange",
  });

  console.log(errors);
  const { t } = useTranslation();
  const { selectedProduct } = useProduct();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(saveProduct({ product: data, productId: selectedProduct?._id }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
    console.log(data);
  };

  useEffect(() => {
    if (selectedProduct) {
      const { name, brand, description, price, category, image } =
        selectedProduct;

      setValue("name", name);
      setValue("description", description);
      setValue("brand", brand);
      setValue("price", price);
      setValue("category", category);
      setValue("image", image);
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, []);

  return (
    <FormPageContainer isProductForm={true}>
      <Text>{t("Add product")}</Text>
      <FormContainer>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            const { name, onChange, value } = field;
            return (
              <Input
                name={name}
                value={value}
                onChange={onChange}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                label={t("Product name")}
              />
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            const { name, onChange, value } = field;
            return (
              <Input
                name={name}
                value={value}
                onChange={onChange}
                helperText={errors.description?.message}
                error={Boolean(errors.description)}
                label={t("Product description")}
              />
            );
          }}
        />
        <Controller
          name="brand"
          control={control}
          render={({ field }) => {
            const { name, onChange, value } = field;
            return (
              <Input
                name={name}
                value={value}
                onChange={onChange}
                helperText={errors.brand?.message}
                error={Boolean(errors.brand)}
                label={t("Product brand")}
              />
            );
          }}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => {
            const { name, onChange, value } = field;
            return (
              <Input
                name={name}
                value={value}
                onChange={onChange}
                helperText={errors.category?.message}
                error={Boolean(errors.category)}
                label={t("Product category")}
              />
            );
          }}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => {
            const { name, onChange, value } = field;
            return (
              <Input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                helperText={errors.price?.message}
                error={Boolean(errors.price)}
                label={t("Product price")}
              />
            );
          }}
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => {
            setValue("image", base64);
          }}
        />
        <Button onClick={handleSubmit(onSubmit)}>{t("save product")}</Button>
      </FormContainer>
    </FormPageContainer>
  );
};
