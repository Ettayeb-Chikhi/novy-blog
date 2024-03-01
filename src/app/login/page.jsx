"use client";
import CardContainer from '../../components/CardContainer';
import CardForm from '../../components/CardForm';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toast from '../../components/Toast';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Typography from '@mui/material/Typography'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { login } from '../../lib/auth-service';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      
      localStorage.setItem("token", res)
      signIn("credentials", {
        ...data,
        callbackUrl: "/novy-blog"
      })
    } catch (error) {
      setOpen(true)
    }

  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <CardContainer>
      <Typography variant='h4' style={{ color: "#8458B3" }}>
        Login with your account
      </Typography>
      <CardForm component="form" method="post" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          {...register("email", {
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            required: true,
          })}
          name='email'
          error={errors.email != undefined}
          helperText={errors.email && "email is not valid"}

        />
        <FormControl sx={{ m: 1 }} variant="standard" >

          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            {...register("password", {
              required: "Password is required"
            })}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name='password'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

            error={errors.password!=undefined}

          />
          <FormHelperText error={errors.password!=undefined}  >
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <Button variant="outlined" color="error" type='reset'>
            Reset
          </Button>
          <Button type='submit' startIcon={<LoginIcon />} variant="contained" color="primary" >
            Login
          </Button>
        </Box>
        <Typography variant="span" color="initial">
          Your dont have an account ? <Link className='link' href="/register">Signup</Link>
        </Typography>
      </CardForm>
      <Toast open={open} handleClose={handleClose} message="Email or password incorrect" isError={true} />
    </CardContainer>

  )
}

export default Login