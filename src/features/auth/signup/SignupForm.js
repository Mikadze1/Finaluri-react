import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "./signupValidation";
import { FormContainer, Input, Button } from "../../../components/atoms";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../../redux/slices/userSlice";
import { useUser } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SignupForm = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupValidationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useUser();

  const onSubmit = (data) => {
    dispatch(authenticateUser({ formValues: data, isLogin: false }))
      .unwrap()
      .then((data) => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(data);
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("First name")}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          );
        }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const { name, onChange } = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("Last name")}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          );
        }}
      />
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
        Sign up
      </Button>
    </FormContainer>
  );
};
