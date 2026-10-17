import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getProductos, STOCK_CRITICO } from '../../services/adminData';

const AdminListadoProductosCriticos = () => {
    const criticos = getProductos()
        .filter((p) => p.stock <= STOCK_CRITICO)
        .sort((a, b) => a.stock - b.stock);

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin
                titulo="Productos críticos"
                subtitulo={`Productos con ${STOCK_CRITICO} unidades o menos.`}
                volverA="/admin/productos"
            />

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th className="text-end">Acciones</th></tr>
                    </thead>
                    <tbody>
                        {criticos.length === 0 && (
                            <tr><td colSpan="5" className="text-center text-muted py-4">Todo en orden: ningún producto tiene stock crítico.</td></tr>
                        )}
                        {criticos.map((p) => (
                            <tr key={p.id}>
                                <td><img src={p.image} alt={p.name} style={{ width: 48, height: 48, objectFit: 'contain' }} /></td>
                                <td>{p.name}</td>
                                <td>{p.categoria}</td>
                                <td><span className="badge bg-danger">{p.stock}</span></td>
                                <td className="text-end">
                                    <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-primary">Reponer stock</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminListadoProductosCriticos;
