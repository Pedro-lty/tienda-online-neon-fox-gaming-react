import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getUsuarios, eliminarUsuario } from '../../services/adminData';

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState(getUsuarios);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState('');

    const filtrados = usuarios.filter((u) =>
        `${u.nombre || ''} ${u.apellido || ''} ${u.email || ''}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    const eliminar = (u) => {
        if (!window.confirm(`¿Eliminar al usuario ${u.email}?`)) return;
        const r = eliminarUsuario(u.email);
        setError(r.ok ? '' : r.error);
        setUsuarios(getUsuarios());
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Gestión de usuarios" subtitulo={`${usuarios.length} usuarios registrados`}>
                <Link to="/admin/usuarios/nuevo" className="btn btn-primary">Nuevo usuario</Link>
            </EncabezadoAdmin>

            {error && <div className="alert alert-danger">{error}</div>}

            <input
                className="form-control mb-3"
                style={{ maxWidth: 360 }}
                placeholder="Buscar por nombre o correo"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th className="text-end">Acciones</th></tr>
                    </thead>
                    <tbody>
                        {filtrados.length === 0 && (
                            <tr><td colSpan="5" className="text-center text-muted py-4">No hay usuarios que coincidan.</td></tr>
                        )}
                        {filtrados.map((u) => {
                            const id = encodeURIComponent(u.email);
                            const estado = u.estado || 'Activo';
                            return (
                                <tr key={u.email}>
                                    <td>{u.nombre} {u.apellido}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role === 'Admin' ? 'Administrador' : 'Cliente'}</td>
                                    <td><span className={`badge ${estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>{estado}</span></td>
                                    <td className="text-end text-nowrap">
                                        <Link to={`/admin/usuarios/${id}`} className="btn btn-sm btn-outline-secondary me-1">Ver</Link>
                                        <Link to={`/admin/usuarios/editar/${id}`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                                        <Link to={`/admin/usuarios/${id}/compras`} className="btn btn-sm btn-outline-dark me-1">Compras</Link>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u)}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminUsuarios;
