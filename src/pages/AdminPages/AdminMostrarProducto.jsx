import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getProducto, clp, STOCK_CRITICO } from '../../services/adminData';

const AdminMostrarProducto = () => {
    const { id } = useParams();
    const p = getProducto(id);

    if (!p) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Producto no encontrado" volverA="/admin/productos" />
                <p>El producto que buscas no existe o fue eliminado.</p>
            </PlantillaAdmin>
        );
    }

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Detalle de producto" volverA="/admin/productos">
                <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-primary">Editar producto</Link>
            </EncabezadoAdmin>

            <div className="bg-white rounded shadow-sm p-4">
                <div className="row g-4">
                    <div className="col-md-4 text-center">
                        <img src={p.image} alt={p.name} className="img-fluid" style={{ maxHeight: 260, objectFit: 'contain' }} />
                    </div>
                    <div className="col-md-8">
                        <p><strong>Código:</strong> {p.id}</p>
                        <p><strong>Nombre:</strong> {p.name}</p>
                        <p><strong>Marca:</strong> {p.brand || '—'}</p>
                        <p><strong>Categoría:</strong> {p.categoria}</p>
                        <p><strong>Precio:</strong> {clp(p.price)}</p>
                        <p>
                            <strong>Stock:</strong> {p.stock} unidades{' '}
                            {p.stock <= STOCK_CRITICO && <span className="badge bg-danger">Stock crítico</span>}
                        </p>
                        <p className="mb-0"><strong>Descripción:</strong> {p.description || 'Sin descripción'}</p>
                    </div>
                </div>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminMostrarProducto;
