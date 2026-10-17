import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getCategorias, getProductos, eliminarCategoria } from '../../services/adminData';

const AdminCategorias = () => {
    const [categorias, setCategorias] = useState(getCategorias);
    const [error, setError] = useState('');
    const productos = getProductos();

    const eliminar = (c) => {
        if (!window.confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
        const r = eliminarCategoria(c.id);
        setError(r.ok ? '' : r.error);
        setCategorias(getCategorias());
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Categorías" subtitulo="Organiza los productos de la tienda.">
                <Link to="/admin/categorias/nueva" className="btn btn-primary">Nueva categoría</Link>
            </EncabezadoAdmin>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Nombre</th><th>Descripción</th><th>Productos</th><th className="text-end">Acciones</th></tr>
                    </thead>
                    <tbody>
                        {categorias.length === 0 && (
                            <tr><td colSpan="4" className="text-center text-muted py-4">Aún no hay categorías. Crea la primera.</td></tr>
                        )}
                        {categorias.map((c) => (
                            <tr key={c.id}>
                                <td className="fw-semibold">{c.nombre}</td>
                                <td>{c.descripcion || '—'}</td>
                                <td>{productos.filter((p) => p.categoria === c.nombre).length}</td>
                                <td className="text-end text-nowrap">
                                    <Link to={`/admin/categorias/editar/${c.id}`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(c)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminCategorias;
