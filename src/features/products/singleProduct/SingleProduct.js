import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks";
import { LoadingWrapper, Text } from "../../../components/atoms";
import { Box, Stack, styled } from "@mui/material";

const StyledImage = styled("img")(() => ({
  width: "350px",
  height: "350px",
  objectFit: "cover",
  borderRadius: 10,
}));

const Description = styled(Box)(() => ({
  display: "flex",
  alignItem: "center",
  marginBottom: "15px",
}));

export const SingleProduct = () => {
  const { getData, data, loading } = useFetchData();
  const { id, category } = useParams();

  useEffect(() => {
    getData(`/products/category/${category}/${id}`);
  }, [getData, id, category]);

  const { image, name, brand, description } = data?.product || {};

  return (
    <LoadingWrapper isLoading={loading}>
      <Stack direction="row" justifyContent="center" gap="10vw">
        <img
          style={{ width: "40vw", overflow: "hidden" }}
          src={image}
          alt={`${name}-${brand}`}
        />
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 4.5rem)" }}>{name}</h1>
            <h1
              style={{
                fontSize: "clamp(1rem, 2vw, 3rem)",
                color: "rgb(80, 80, 80)",
              }}
            >
              {brand}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                color: "rgb(100, 100, 100)",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </Stack>
    </LoadingWrapper>
  );
};
