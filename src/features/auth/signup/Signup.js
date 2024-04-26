import React from "react";
import { Stack } from "@mui/material";
import { Link, Snackbar, Text } from "../../../components/atoms";
import { SignupForm } from "./SignupForm";
import { useUser } from "../../../hooks";
import { useDispatch } from "react-redux";
import { cleanError } from "../../../redux/slices/userSlice";
import { FormPageContainer } from "../../../components/atoms/FormContainer";
import LogoImage from "../../../assets/images/Logo.png";
import { useTranslation } from "react-i18next";

export const Signup = () => {
  const { error } = useUser();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <FormPageContainer isLoginForm={false}>
      <Stack>
        <Text>{t("signup")}</Text>
        <SignupForm />
      </Stack>
      <Snackbar
        message={error}
        onClose={() => {
          dispatch(cleanError());
        }}
        severity="error"
      />
    </FormPageContainer>
  );
};
