"use client";

import React from "react";
import { BsSearch } from "react-icons/bs";
import { InputAdornment, TextField } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <TextField
      label="Buscar"
      placeholder="Buscar..."
      variant="outlined"
      type="search"
      size="small"
      fullWidth
      onChange={(e) => {
        handleOnChange(e.target.value);
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <BsSearch />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default Search;
