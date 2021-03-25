import React from 'react';
import Layout from '../components/layouts/Layout';
import {css} from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//validacion
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre : '',
  email: '',
  password: '' //en lugar de poner '' me recomienda la terminal ponerlo como true..."If you want to write it to the DOM, pass a string instead: password="true" or password={value.toString()}.
}

const CrearCuenta = () => {

  const {valores, errores, submitForm, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta );

  function crearCuenta(){
    console.log('creando cuenta...');
  }

  const {nombre, email, password} = valores;

  return (
    <div>      
      <Layout>
        <>
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `}>Crear Cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </Campo>

            {errores.nombre && <Error>{errores.nombre}</Error>}

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
            
            <InputSubmit
              type="submit"
              value="Crear Cuenta"
            />
          </Formulario> 
        </>
      </Layout>
           
    </div>
  )
}
export default CrearCuenta;
