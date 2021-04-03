import React from 'react';

const DeatallesProducto = ({producto}) => {

    const { id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos } = producto;

    return(
        <li>
            <div>
                <div>

                </div>

                <div>
                    {nombre}
                </div>
            </div>

            <div>

            </div>
        </li>
    )
}
export default DeatallesProducto;