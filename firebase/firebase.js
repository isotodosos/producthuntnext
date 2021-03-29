import app from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './confi';

class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        
        this.auth = app.auth();
    }

    //registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        //como tambien le pedimos en el formulario el nombre asi lo añadimos...
        return nuevoUsuario.user.updateProfile({
            displayName : nombre
        })
    }

    //iniciar sesion del usuario
    async login(email, password) {        
        return this.auth.signInWithEmailAndPassword(email,password);
    }

    //cierra sesion del usuario
    async cerrarSesion () {
        await this.auth.signOut()
    }

    
}

const firebase = new Firebase();
export default firebase;