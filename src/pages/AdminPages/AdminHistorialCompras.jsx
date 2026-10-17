import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getUsuario, comprasDeUsuario, clp } from '../../services/adminData';

const AdminHistorialCompras = () => {
    const { id } = useParams();
    const usuario = getUsuario(id);
    const compras = comprasDeUsuario(id);
    const totalGastado = compras
        .filter((o) => o.estado !== 'Cancelada')
        .reduce((suma, o) => suma + o.total, 0);

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin
                titulo="Historial de compras"
                subtitulo={usuario ? `${usuario.nombre} ${usuario.apellido || ''} (${usuario.email})` : id}
                volverA={`/admin/usuarios/${encodeURIComponent(id)}`}
            />

            <p className="fw-semibold">Total gastado: {clp(totalGastado)}</p>

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Orden</th><th>Fecha</th><th>Total</th><th>Estado</th><th className="text-end">Boleta</th></tr>
                    </thead>
                    <tbody>
                        {compras.length === 0 && (
                            <tr><td colSpan="5" className="text-center text-muted py-4">Este usuario aún no registra compras con su correo.</td></tr>
                        )}
                        {compras.map((o) => (
                            <tr key={o.codigo}>
                                <td>#{o.codigo}</td>
                                <td>{o.fecha}</td>
                                <td>{clp(o.total)}</td>
                                <td>{o.estado}</td>
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

export default AdminHistorialCompras;
