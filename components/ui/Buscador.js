import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';

import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;

    &:hover{
        cursor : pointer;
    }
`;



const Buscador = () => {

    const [ busqueda, guardarBusqueda ] = useState('');

    const buscarProducto = e => {
        e.preventDefault();
        
        if(busqueda.trim() === '') return;

        // redireccionamos a /buscar
        Router.push({
            pathname : '/buscador',
            query : { q : busqueda}//generalmente se recomienda poner q de query para la url 
        })
    }

    return(
        <form 
            css={css`
                position: relative;            
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="buscar productos"
                onChange= {e=> guardarBusqueda(e.target.value)}
            />
            <InputSubmit type="submit"/>
        </form>
    )
}
export default Buscador;