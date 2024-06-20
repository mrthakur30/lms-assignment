import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface IFormInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>();
  const navigate= useNavigate();
  
  const onSubmit = async (data: IFormInput) => {
    try {
      await login(data.username, data.password);
      navigate('/');
    } catch (error) {
      toast.error("Login error")
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
