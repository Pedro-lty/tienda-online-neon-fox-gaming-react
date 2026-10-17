import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getUsuario, comprasDeUsuario } from '../../services/adminData';

const AdminMostrarUsuario = () => {
    const { id } = useParams();
    const u = getUsuario(id);

    if (!u) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Usuario no encontrado" volverA="/admin/usuarios" />
                <p>El usuario que buscas no existe o fue eliminado.</p>
            </PlantillaAdmin>
        );
    }

    const enc = encodeURIComponent(u.email);
    const estado = u.estado || 'Activo';

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Detalle de usuario" volverA="/admin/usuarios">
                <Link to={`/admin/usuarios/${enc}/compras`} className="btn btn-outline-dark">Ver compras</Link>
                <Link to={`/admin/usuarios/editar/${enc}`} className="btn btn-primary">Editar usuario</Link>
            </EncabezadoAdmin>

            <div className="bg-white rounded shadow-sm p-4" style={{ maxWidth: 700 }}>
                <p><strong>Nombre:</strong> {u.nombre} {u.apellido}</p>
                <p><strong>Correo:</strong> {u.email}</p>
                {u.rut && <p><strong>RUT:</strong> {u.rut}</p>}
                {u.telefono && <p><strong>Teléfono:</strong> {u.telefono}</p>}
                <p><strong>Rol:</strong> {u.role === 'Admin' ? 'Administrador' : 'Cliente'}</p>
                <p><strong>Estado:</strong> <span className={`badge ${estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>{estado}</span></p>
                <p className="mb-0"><strong>Compras realizadas:</strong> {comprasDeUsuario(u.email).length}</p>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminMostrarUsuario;
