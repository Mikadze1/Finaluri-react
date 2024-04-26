import React from "react";
import { Stack } from "@mui/material";
import { Link, Snackbar, Text } from "../../../components/atoms";
import { LoginForm } from "./LoginForm";
import { useUser } from "../../../hooks";
import { useDispatch } from "react-redux";
import { cleanError } from "../../../redux/slices/userSlice";
import { FormPageContainer } from "../../../components/atoms/FormContainer";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { error } = useUser();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <FormPageContainer isLoginForm={false}>
        <Stack>
          <Text>{t("login")}</Text>
          <LoginForm />
        </Stack>
      </FormPageContainer>

      <Snackbar
        message={error}
        onClose={() => {
          dispatch(cleanError());
        }}
        severity="error"
      />
    </>
  );
};
