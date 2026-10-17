import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getProductos, eliminarProducto, clp, STOCK_CRITICO } from '../../services/adminData';

const AdminProductos = () => {
    const [productos, setProductos] = useState(getProductos);
    const [busqueda, setBusqueda] = useState('');

    const filtrados = productos.filter((p) =>
        `${p.name} ${p.brand} ${p.categoria}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    const eliminar = (p) => {
        if (!window.confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) return;
        eliminarProducto(p.id);
        setProductos(getProductos());
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Gestión de productos" subtitulo={`${productos.length} productos en total`}>
                <Link to="/admin/productos-criticos" className="btn btn-outline-warning">Stock crítico</Link>
                <Link to="/admin/productos/nuevo" className="btn btn-primary">Nuevo producto</Link>
            </EncabezadoAdmin>

            <input
                className="form-control mb-3"
                style={{ maxWidth: 360 }}
                placeholder="Buscar por nombre, marca o categoría"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.length === 0 && (
                            <tr><td colSpan="6" className="text-center text-muted py-4">No hay productos que coincidan.</td></tr>
                        )}
                        {filtrados.map((p) => (
                            <tr key={p.id}>
                                <td><img src={p.image} alt={p.name} style={{ width: 48, height: 48, objectFit: 'contain' }} /></td>
                                <td style={{ maxWidth: 320 }}>{p.name}</td>
                                <td>{p.categoria}</td>
                                <td>{clp(p.price)}</td>
                                <td>
                                    <span className={`badge ${p.stock <= STOCK_CRITICO ? 'bg-danger' : 'bg-success'}`}>{p.stock}</span>
                                </td>
                                <td className="text-end text-nowrap">
                                    <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-secondary me-1">Ver</Link>
                                    <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminProductos;
