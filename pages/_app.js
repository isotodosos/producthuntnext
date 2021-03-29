import '../styles/globals.css'

import App from 'next/app';
import firebase, {FirebaseContext} from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) { //Component = componente actual y pageProps = las props de la página

  const usuario = useAutenticacion();
  //console.log(usuario);

  return ( //<Component {...pageProps} />
    <FirebaseContext.Provider
        value={{
          firebase, // este va a contener todos los métodos de firebase para interactuar con la bbdd..
          usuario
        }}
    >
      <Component {...pageProps}/>
    </FirebaseContext.Provider>
  )
}

export default MyApp
