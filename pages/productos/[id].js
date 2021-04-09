import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';

import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import { Campo, InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

import {css} from '@emotion/react';
import styled from '@emotion/styled';




const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`

const Producto = () => {

    //state del componente 
    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);
    const [ comentario, guardarComentario ] = useState({});
    

    //asi obtienes el id de la url..
    const router = useRouter();
    const {query : {id}} = router;

    // Context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id){
            
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();

                if(producto.exists){
                    
                        
                    guardarProducto(producto.data());
                    //console.log('si existe');
                   
                }else{
                    
                        
                    guardarError(true);
                    //console.log('no existe'); 
                    
                    
                }
                
            }

            obtenerProducto();
        }
    },[id, producto])



    if(Object.keys(producto).length === 0) return 'Cargando...'

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, havotado } = producto;



    const votarProducto = () => {
        //añadimos esta capa extra de seguridad aunke no haría falta..
        if(!usuario){
            return router.push('/login');
        }

        if(havotado.includes(usuario.uid)) return;

        const nuevoHaVotado = [...havotado, usuario.uid]
        
        const totalVotos = votos + 1;
        
        // modificamos en la bbdd
        firebase.db.collection('productos').doc(id).update({ votos : totalVotos, havotado: nuevoHaVotado});

        // modificamos el state
        guardarProducto({
            ...producto,
            votos : totalVotos
        })
    }

    
    //funciones de agregar comentario

    const comentarioChange = (e) => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
        
    }

    const agregarComentario = e => {
        e.preventDefault();

        //añadimos esta capa extra de seguridad aunke no haría falta..
        if(!usuario){
            return router.push('/login');
        }

        //llenamos con mas informacion extra el objeto..
        comentario.usuarioId = usuario.uid;
        comentario.usuarioName = usuario.displayName;

        // tomar copia de comentarios y añadir el comentario reciente
        const nuevosComentarios = [...comentarios, comentario]

        // Actualizar la bbdd

        firebase.db.collection('productos').doc(id).update({ comentarios : nuevosComentarios});

        //Actualizar el state
        guardarProducto({
            ...producto,
            comentarios : nuevosComentarios
        })

    }


    return(
        <Layout>
            <>
                
                {error && <Error404/>}

                <div className="contenedor">
                   
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{nombre}</h1>

                    <ContenedorProducto>

                        <div>
                            <p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} ) }</p>
                            {creador ? <p>Por {creador.nombre} de {empresa}</p> : null}                            
                            <img src={urlimagen}/>
                            <p>{descripcion}</p>
                            {usuario && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >

                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar comentario"
                                        />
                                        
                                    </form>
                                </>
                            )}
                            
                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >Comentarios</h2>

                            {comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                <ul>
                                    {comentarios.map((comentario, i ) =>(
                                        <li 
                                            key={`${comentario.usuarioId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `
                                        }>
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por: 
                                                <span
                                                    css={css`
                                                    font-weight: bold;
                                                    `}
                                                >
                                                   {' '} {comentario.usuarioName}
                                                </span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar la url</Boton>

                            <div
                                css={css`
                                    margin-top:5rem;
                                `}
                            >
                                <p
                                    css={css`
                                    text-align: center;
                                `}
                                >{votos} Votos</p>
                                {usuario && (
                                    <Boton
                                        onClick={votarProducto}
                                    >Votar</Boton>
                                )}
                                
                            </div>
                        </aside>

                    </ContenedorProducto>

                </div>
                
            </>
        </Layout>
        
    )
}
export default Producto;