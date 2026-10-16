import React from 'react';
import { Link } from 'react-router-dom';

const BotonEnlace = ({ ruta, texto, esSecundario = false }) => {
    const clase = esSecundario ? "boton secundario" : "boton";
    
    return (
        <Link className={clase} to={ruta}>
            {texto}
        </Link>
    );
};

export default BotonEnlace;