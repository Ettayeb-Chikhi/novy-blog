"use client";
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import path from 'path';
const Div = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "block",
    width: "80%",
    marginInline: "auto",
    marginTop: "10px",

  },
  borderRadius: "25px",
  backgroundColor: "white",
  padding: 20,
  display: "none"
}))



const SearchBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [term,setTerm] = useState("");
  const searchTerm= useMemo(()=>{
    const urlAsArray = pathName.split("/");
    setTerm(urlAsArray.includes("tag") ? urlAsArray.pop() : "");
  },[pathName])
  const handleSearch = (e) => {
    if (e.key == "Enter" && e.target.value.trim() != "") {
      router.push(`/novy-blog/tag/${e.target.value}`)
    }
  }

  return (
    <Div>
      <TextField
        id="search-field"
        placeholder='search by Tag'
        onKeyDown={handleSearch}
        defaultValue={term}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ cursor: "pointer" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Div>
  )
}

export default SearchBar