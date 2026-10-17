import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getOrdenes, cambiarEstadoOrden, clp, ESTADOS_ORDEN } from '../../services/adminData';

const AdminOrdenes = () => {
    const [ordenes, setOrdenes] = useState(getOrdenes);

    const cambiarEstado = (codigo, estado) => {
        cambiarEstadoOrden(codigo, estado);
        setOrdenes(getOrdenes());
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Órdenes y boletas" subtitulo={`${ordenes.length} órdenes registradas`} />

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Orden</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th className="text-end">Boleta</th></tr>
                    </thead>
                    <tbody>
                        {ordenes.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    Aún no hay órdenes. Aparecen aquí cuando un cliente completa una compra.
                                </td>
                            </tr>
                        )}
                        {ordenes.map((o) => (
                            <tr key={o.codigo}>
                                <td className="fw-semibold">#{o.codigo}</td>
                                <td>{o.fecha}</td>
                                <td>{o.cliente?.nombre} {o.cliente?.apellidos}</td>
                                <td>{clp(o.total)}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        style={{ width: 140 }}
                                        value={o.estado || 'Pagada'}
                                        onChange={(e) => cambiarEstado(o.codigo, e.target.value)}
                                    >
                                        {ESTADOS_ORDEN.map((e) => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </td>
                                <td className="text-end">
                                    <Link to={`/admin/ordenes/${o.codigo}`} className="btn btn-sm btn-outline-primary">Ver boleta</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminOrdenes;
