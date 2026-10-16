import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

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
            <form className="formulario">
                <div className="grupo-formulario">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input id="nombre" type="text" defaultValue="x x" required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="correo">Correo</label>
                    <input id="correo" type="email" defaultValue="x@gmail.com" required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="rol">Rol</label>
                    <select id="rol" defaultValue="Administrador" required>
                        <option value="Administrador">Administrador</option>
                        <option value="Cliente">Cliente</option>
                    </select>
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="estado">Estado</label>
                    <select id="estado" defaultValue="Activo">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <button className="boton" type="submit">Guardar cambios</button>
            </form>
        </PlantillaAdmin>
    );
};

export default AdminEditarUsuario;