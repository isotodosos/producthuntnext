import React,{ useState, useEffect, useContext} from 'react';
import Layout from '../components/layouts/Layout';
import DeatallesProducto from '../components/layouts/DeatallesProducto';

import {FirebaseContext} from '../firebase';


const Home = () => {

  const [ productos, guardarProductos ] = useState([]);

  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {

    const obtenerProductos = () => {

      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)

    }

    obtenerProductos();

  },[])

  function manejarSnapshot(snapshot) {

    const productos = snapshot.docs.map( doc => {
      return({
        id: doc.id,
        ...doc.data()
      })
    })

    guardarProductos(productos);

  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto => (
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
export default Home;
