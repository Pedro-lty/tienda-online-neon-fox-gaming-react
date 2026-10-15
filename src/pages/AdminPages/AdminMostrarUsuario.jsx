import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminMostrarUsuario = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <div>
                    <p className="saludo">Usuarios</p>
                    <h1>Detalle de usuario</h1>
                </div>
                <a className="boton secundario" href="/admin/usuarios">Volver</a>
            </div>
            <section className="formulario detalle">
                <p>
                    <strong>ID:</strong> 001
                </p>
                <p>
                    <strong>Nombre:</strong> Camila Pérez
                </p>
                <p>
                    <strong>Correo:</strong> camila@gmail.com
                </p>
                <p>
                    <strong>Rol:</strong> Administrador
                </p>
                <p>
                    <strong>Estado:</strong> Activo
                </p>
                <a className="boton" href="/admin/editar-usuario">Editar usuario</a>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminMostrarUsuario;