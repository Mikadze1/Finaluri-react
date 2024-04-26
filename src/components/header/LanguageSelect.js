import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const languageCodes = {
  en: "English",
  ka: "Georgian",
};

export const LanguageSelect = () => {
  const [langCode, setLangCode] = useState(
    () => localStorage.getItem("langCode") || "en"
  );

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("langCode", langCode);
  }, [i18n, langCode]);

  return (
    <FormControl SX={{ minWidth: 120, m: 1 }}>
      <Select
        sx={{
          color: "#FF9900",
          border: "2px solid #000000",
          outlineColor: "#000000",
        }}
        value={langCode}
        onChange={(e) => {
          setLangCode(e.target.value);
        }}
        defaultValue={langCode}
      >
        {Object.entries(languageCodes).map((item) => {
          const [languageKey, languageValue] = item;
          return (
            <MenuItem key={languageValue} value={languageKey}>
              {languageValue}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
