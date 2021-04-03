export default function validarCrearProducto(valores){

    let errores = {};

    //validamos el nombre
    if(!valores.nombre){
        errores.nombre = 'El nombre es obligatorio';
    }

    //validamos la empresa
    if(!valores.empresa){
        errores.empresa = 'El nombre de la empresa es obligatorio';
    }

    //validamos la url
    if(!valores.url){
        errores.url = 'La url es obligatoria';
    }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = 'Url mal formateada o no válida';
    }

    //validamos la descripcion
    if(!valores.descripcion){
        errores.descripcion = 'Agrega una descripción a tu producto';
    }

    return errores;


}