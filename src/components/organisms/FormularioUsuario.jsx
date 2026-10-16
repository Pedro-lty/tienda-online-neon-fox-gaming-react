import React from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelect from '../molecules/CampoSelect';

const FormularioUsuario = () => {
    return (
        <form className="formulario">
            
            <CampoFormulario 
                id="nombre" 
                label="Nombre completo" 
                valorDefecto="Camila Pérez" 
            />
            
            <CampoFormulario 
                id="correo" 
                label="Correo" 
                tipo="email" 
                valorDefecto="camila@gmail.com" 
            />
            
            <CampoSelect 
                id="rol" 
                label="Rol" 
                valorDefecto="Administrador" 
                opciones={[
                    { valor: "Administrador", texto: "Administrador" },
                    { valor: "Cliente", texto: "Cliente" }
                ]} 
            />
            
            <CampoSelect 
                id="estado" 
                label="Estado" 
                valorDefecto="Activo" 
                opciones={[
                    { valor: "Activo", texto: "Activo" },
                    { valor: "Inactivo", texto: "Inactivo" }
                ]} 
            />
            
            {/* Este botón podría ser un Átomo también, pero lo dejaremos así por ahora */}
            <button className="boton" type="submit">Guardar cambios</button>
            
        </form>
    );
};

export default FormularioUsuario;