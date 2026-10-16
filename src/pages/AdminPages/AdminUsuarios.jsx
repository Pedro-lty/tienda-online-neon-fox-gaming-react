import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminUsuarios = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Gestión de Usuarios</h1>
            </div>
            <section className="contenido">
                <div style={{ marginBottom: '20px' }}>
                    <a className="boton" href="/admin/nuevo-usuario">Nuevo Usuario</a>
                </div>
                {/* Aquí irá la tabla de usuarios */}
            </section>
        </PlantillaAdmin>
    );
};

export default AdminUsuarios;