import React, { useState, useCallback } from "react";
import { axiosInstance } from "../helpers";

export const useFetchData = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const getData = useCallback(async (url) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axiosInstance.get(url);
      setState((prev) => ({ ...prev, loading: false, data }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error }));
    }
  }, []);

  return {
    ...state,
    getData,
    setState,
  };
};
