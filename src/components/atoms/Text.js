import { Typography } from "@mui/material";
import React from "react";


export const Text = ({ variant = "body1", children, ...rest}) => {
  return (
    <Typography variant={variant} {...rest}> 
      {children} 
    </Typography>
  )
};
