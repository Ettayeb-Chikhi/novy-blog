"use client";
import styled from '@mui/material/styles/styled';
const Div = styled("div")(({theme})=>({
    [theme.breakpoints.down("sm")]:{
        display:"block",
        width:"100%",
    },
    backgroundColor:"red",
    display:"none"
}))

const SearchBar = () => {
  return (
    <Div>SearchBar</Div>
  )
}

export default SearchBar