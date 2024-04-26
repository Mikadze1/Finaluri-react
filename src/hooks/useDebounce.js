import { useEffect, useState } from "react";

export const useDebounce = (delay = 500, value) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
};
