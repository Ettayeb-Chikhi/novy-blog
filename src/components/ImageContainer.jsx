import styled from '@mui/material/styles/styled';

const ImgContainer = styled("div")(({ theme }) => ({
    width: "100%",
    backgroundSize:"cover",
    backgroundPosition: "center",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "25px",
}))

export default ImgContainer;