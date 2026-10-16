import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import FormularioUsuario from '../../components/organisms/FormularioUsuario';

const AdminEditarUsuario = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <div>
                    <p className="saludo">Usuarios</p>
                    <h1>Editar usuario</h1>
                </div>
                <a className="boton secundario" href="/admin/usuarios">Volver</a>
            </div>
            
            {/* Inyectamos el organismo completo del formulario */}
            <FormularioUsuario />
            
        </PlantillaAdmin>
    );
};

export default AdminEditarUsuario;