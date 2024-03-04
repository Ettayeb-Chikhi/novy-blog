import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/material/styles/styled';

const Div = styled("div")(({theme})=>({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"300px"
}))

const Loader = () => {
  return (
    <Div>
        <CircularProgress />
    </Div>
  )
}

export default Loader