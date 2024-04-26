import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { loginValidationSchema } from "./loginValidation";
import { FormContainer, Input, Button } from "../../../components/atoms";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../../redux/slices/userSlice";
import { useUser } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginValidationSchema),
  });

  const navigate = useNavigate();
  const { loading } = useUser;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(authenticateUser({ formValues: data, isLogin: true }))
      .unwrap()
      .then((data) => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("Email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <Input
              type="password"
              name={name}
              onChange={onChange}
              label={t("Password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          );
        }}
      />
      <Button disabled={!isValid || loading} onClick={handleSubmit(onSubmit)}>
        Log in
      </Button>
    </FormContainer>
  );
};
