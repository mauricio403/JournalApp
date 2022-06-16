import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio!'],
}

export const RegisterPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])


  const { displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm({
    email: '',
    password: '',
    displayName: '',
  }, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  }


  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{
            mt: 2
          }}>
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='noobMaster64'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{
            mt: 2
          }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{
            mt: 2
          }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='******'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{
            mb: 2,
            mt: 1
          }} >

            <Grid item xs={12}  display={!!errorMessage ? '': 'none'}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth type='submit' disabled={isCheckingAuthentication}>
                Crear Cuenta
              </Button>
            </Grid>


          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>



  )
}
