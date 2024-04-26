import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Link } from "../../components/atoms/index";
import { Searchbar } from "./Searchbar";
import { UserIcon } from "./UserIcon";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { CartModal } from "./CartModal";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "../../hooks";
import { BsCart4, BsSearch } from "react-icons/bs";
import Logo from "../../assets/images/Logo.png";
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "rgb(230, 230, 230)",
  padding: "0 37px 0 30px",
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: 8,
  paddingBottom: 8,
}));

export const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isSearchbarExpanded, setSearchbarExpanded] = useState(false);
  const { cartItems } = useCart();
  const isMobileView = useMediaQuery("(max-width: 800px)");

  const cartItemsQuantity = cartItems?.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
  return (
    <Box>
      <StyledAppBar>
        <StyledToolbar>
          <Link style={{ color: "white" }} to="/">
            {/* {t("home")} */}
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                style={{ height: "3rem", marginBlock: "0.2rem" }}
              />
            </Link>
          </Link>
          {!isMobileView && <Searchbar />}
          {isMobileView && (
            <Button
              onClick={() => {
                setSearchbarExpanded((prev) => !prev);
              }}
            >
              <BsSearch color="white" size={25} style={{ marginLeft: "10" }} />
            </Button>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              disabled={cartItems.length === 0}
            >
              <Badge badgeContent={cartItemsQuantity} color={"primary"}>
                <MdOutlineShoppingCart size={30} />
              </Badge>
            </Button>
            <UserIcon />
            <LanguageSelect />
          </Box>
        </StyledToolbar>
        {isMobileView && isSearchbarExpanded && <Searchbar width="100%" />}
        <CartModal
          open={open}
          setOpen={setOpen}
          cartItems={cartItems}
          totalQuantity={cartItemsQuantity}
        />
      </StyledAppBar>
    </Box>
  );
};
