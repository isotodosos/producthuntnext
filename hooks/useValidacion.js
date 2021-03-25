import React, {useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, fn) => {
    //dentro de los parentesis hay lo mismo que se pasaría dentro de los corchetes de un useState al uso, es decir EJ: const[ejemplo, handleEjemplo] = useState([])
    //la idea de este hook es que sirva tanto para crearcuenta, login y crearproducto

    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            //con Object.keys es una forma de revisar si un OBJETO esta vacio
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn(); // función que se ejecuta en el componente
            }
            guardarSubmitForm(false);
        }
    },[errores])

    //funcion que se ejecuta conforme el usuario va escribiendo
    const handleChange = (e) => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //funcion que se ejecuta con el submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    //cuando se realiza el evento de blur (salir del input)
    const handleBlur = e => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return{
        valores,
        errores,
        submitForm,
        handleChange,
        handleSubmit,
        handleBlur

    }
}
export default useValidacion;