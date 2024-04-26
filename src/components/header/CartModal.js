import Modal from "@mui/material/Modal";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Box, styled, Stack, Divider, Chip } from "@mui/material";
import { Button, Text } from "../atoms";
import { useCart } from "../../hooks";
import { IoIosClose } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart, removeProductFromCart } from "../../redux";
import { useTranslation } from "react-i18next";

export const CartModal = ({ open, setOpen, cartItems, totalQuantity }) => {
  const { t } = useTranslation();
  const handleClose = () => setOpen(false);
  const totalSum = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "white",
              border: "2px solid #000",
              borderRadius: 5,
              boxShadow: 24,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="h6" fontWeight="medium">
                {totalQuantity} {t("items in cart")}
              </Text>
              <Button onClick={handleClose}>
                <IoIosClose size={30} />
              </Button>
            </Stack>
            {cartItems.map((item) => {
              return (
                <ShoppingCartItem
                  key={item.product._id}
                  product={item.product}
                  quantity={item.quantity}
                />
              );
            })}
            <Stack direction="row" justifyContent="space-between">
              <Text fontWeight="bold">{t("Total sum")}</Text>
              <Text fontWeight="bold">{totalSum}$</Text>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const ShoppingCartItem = ({ product, quantity }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { _id, name, price, image } = product;
  return (
    <Box>
      <Stack direction="row">
        <img
          src={image}
          style={{ width: 120, height: 120, borderRadius: 5 }}
          alt="img"
        />
        <Stack spacing={2} width="100%" paddingX={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Text fontWeight="400">{name}</Text>
            <Text fontWeight="400" sx={{ marginRight: 1 }}>
              {price.toFixed(2)}$
            </Text>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Chip
                label={t("In stock")}
                color="success"
                sx={{ borderRadius: 1.5, width: 80, height: 30 }}
              />
              {/* peri sheucvalee amas */}
              <GoTrash
                onClick={() => dispatch(removeProductFromCart(_id))}
                size={20}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{ border: "1px solid red", borderRadius: "30px" }}
            >
              <Button
                onClick={() => {
                  dispatch(removeFromCart(_id));
                }}
              >
                -
              </Button>
              <Text>{quantity}</Text>
              <Button
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                +
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};
