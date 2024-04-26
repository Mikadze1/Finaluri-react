import { Avatar, Box, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";
import { useUser } from "../../hooks/index";
import { useTranslation } from "react-i18next";
import { Button, Link } from "../atoms";
import { isUserAdmin } from "../../helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

const getUserInitials = (userData) => {
  return userData
    ? `${userData.firstName.charAt(0).toUpperCase()}${userData.lastName
        .charAt(0)
        .toUpperCase()}`
    : "";
};

export const UserIcon = () => {
  const { userData } = useUser();
  const [anchor, setAnchor] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Box>
      <IconButton
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        <Avatar>{getUserInitials(userData)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => {
          setAnchor(null);
        }}
      >
        <Stack>
          {!userData && (
            <>
              <MenuItem>
                <Link to="/login"> {t("login")} </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup"> {t("signup")} </Link>
              </MenuItem>
            </>
          )}
          {userData && (
            <>
              <MenuItem>
                <Button
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  {t("logout")}
                </Button>
              </MenuItem>
            </>
          )}
          {isUserAdmin(userData) && (
            <MenuItem>
              <Link to="/products/add">{t("Add product")}</Link>
            </MenuItem>
          )}
        </Stack>
      </Menu>
    </Box>
  );
};
