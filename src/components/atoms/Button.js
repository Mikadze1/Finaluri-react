import React from "react";
import { Button as MUIButton } from "@mui/material";

export const Button = ({ onClick, children, disabled}) => {
  return <MUIButton onClick={onClick} disabled={disabled}>
    {children}
  </MUIButton>
};