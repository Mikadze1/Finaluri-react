import {
  Autocomplete,
  InputAdornment,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Loading, Text } from "../atoms";
import { FaSearch } from "react-icons/fa";
import { useDebounce, useFetchData } from "../../hooks";
import { useTranslation } from "react-i18next";

const StyledImage = styled("img")(() => ({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: 3,
}));

export const Searchbar = ({ width }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebounce(500, searchValue);
  const { getData, loading, data, setState } = useFetchData();

  useEffect(() => {
    if (debouncedSearch) {
      getData(`/products/search?name=${debouncedSearch}`);
    } else {
      setState((prev) => ({ ...prev, data: null }));
    }
  }, [debouncedSearch, getData]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      sx={{
        width: width || "300px",
        ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderRadius: 4,
          borderColor: "#000000",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#000000",
          },
      }}
      loading={loading}
      loadingText={<Loading size={50} />}
      options={data?.products || []}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const { image, category, name, _id, price } = option;
        return (
          <Link to={`/products/categories/${category}/${_id}`}>
            <Stack direction="row">
              <StyledImage src={image} alt={`${category}-${name}`} />
              <Text>{name}</Text>
              <Text sx={{ marginLeft: 10 }}> {price} </Text>
            </Stack>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={setSearchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder={t("Search")}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: "#FF9900" },
            }}
            InputLabelProps={{
              style: { color: "#FF9900" },
            }}
          />
        );
      }}
    />
  );
};
