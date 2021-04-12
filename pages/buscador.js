import React, {useState, useEffect} from 'react';
import Layout from '../components/layouts/Layout';

import {useRouter} from 'next/router';
import DeatallesProducto from '../components/layouts/DeatallesProducto';
import useProductos from '../hooks/useProductos';


const Buscador = () => {

  const router = useRouter();  
  const { query : { q }} = router;
  //console.log(q);

  const {productos} = useProductos('creado');
  const [resultado, guardarResultado] = useState([]);

  useEffect(() => {

    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto => {
      return( 
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    });
    guardarResultado(filtro);

  },[q, productos]);


  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map(producto => (
                <DeatallesProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>  
          </div>  
        </div> 
      </Layout>     
    </div>
  )
}
export default Buscador;