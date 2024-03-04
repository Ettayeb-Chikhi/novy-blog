"use client";
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';

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