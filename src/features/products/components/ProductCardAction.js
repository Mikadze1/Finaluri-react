import React from "react";
import { useUser } from "../../../hooks";
import { FaPlus } from "react-icons/fa6";
import {
  Card,
  styled,
  Bow,
  CardActions,
  Grid,
  Fab,
  Stack,
} from "@mui/material";
import { Button, Text } from "../../../components/atoms";
import { isUserAdmin } from "../../../helpers";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  setSelectedProduct,
} from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux";
import { useTranslation } from "react-i18next";

const StyledFab = styled(Fab)(() => ({
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const ProductCardAction = ({ product }) => {
  const { t } = useTranslation();
  const { userData } = useUser(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isUserAdmin(userData))
    return (
      <Stack>
        <Button
          onClick={() => {
            dispatch(setSelectedProduct(product));
            navigate(`/products/${product._id}/edit`);
          }}
        >
          {t("edit")}
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteProduct({ id: product._id }));
          }}
        >
          {t("delete")}
        </Button>
      </Stack>
    );

  return (
    <StyledFab
      variant="extended"
      onClick={() => {
        dispatch(addToCart(product));
      }}
    >
      <FaPlus styled={{ marginRight: 5 }} color="white" />
      <Text color="#fff">{t("Add to cart")}</Text>
    </StyledFab>
  );
};
