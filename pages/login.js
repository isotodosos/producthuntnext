import React, { useState} from 'react';
import Layout from '../components/layouts/Layout';
import Router from 'next/router';
import {css} from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

import firebase from '../firebase';

//validacion
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';


const STATE_INICIAL = {
  
  email: '',
  password: '' 
}

const Login = () => {

  const [error, guardarError] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion );

  const { email, password} = valores;

  async function iniciarSesion(){
    //como a estas alturas ya esta validado el formulario.. 
    try {
      const usuario = await firebase.login(email, password);
      console.log(usuario);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al autenticar al usuario', error.message);
      guardarError(error.message);
    }
    
    
  }

  return (
    <div>      
      <Layout>
        <>
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `}>Iniciar Sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
          >
            
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </Campo>

            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </Campo>

            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
            
            <InputSubmit
              type="submit"
              value="Iniciar Sesión"
            />
          </Formulario> 
        </>
      </Layout>
           
    </div>
  )
}
export default Login;
