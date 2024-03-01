"use client";
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const CardForm = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: "15px",
    width: "60%",
    padding: 20,
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    marginTop: 25
  }))


export default CardForm