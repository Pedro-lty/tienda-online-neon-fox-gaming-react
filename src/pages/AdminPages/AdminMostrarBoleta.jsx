import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getOrden, cambiarEstadoOrden, clp, ESTADOS_ORDEN } from '../../services/adminData';

const AdminMostrarBoleta = () => {
    const { codigo } = useParams();
    const [orden, setOrden] = useState(() => getOrden(codigo));

    if (!orden) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Boleta no encontrada" volverA="/admin/ordenes" />
                <p>La orden que buscas no existe.</p>
            </PlantillaAdmin>
        );
    }

    const c = orden.cliente || {};

    const cambiarEstado = (e) => {
        cambiarEstadoOrden(orden.codigo, e.target.value);
        setOrden(getOrden(orden.codigo));
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo={`Boleta #${orden.codigo}`} subtitulo={orden.fecha} volverA="/admin/ordenes">
                <select className="form-select" style={{ width: 150 }} value={orden.estado || 'Pagada'} onChange={cambiarEstado}>
                    {ESTADOS_ORDEN.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
            </EncabezadoAdmin>

            <div className="bg-white rounded shadow-sm p-4 mb-3">
                <h2 className="h5">Cliente</h2>
                <p className="mb-1"><strong>Nombre:</strong> {c.nombre} {c.apellidos}</p>
                <p className="mb-1"><strong>Correo:</strong> {c.correo}</p>
                <p className="mb-1">
                    <strong>Dirección:</strong> {c.calle}{c.departamento ? `, depto ${c.departamento}` : ''}, {c.comuna}, {c.region}
                </p>
                <p className="mb-0"><strong>Indicaciones:</strong> {c.indicaciones || 'Sin indicaciones'}</p>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table align-middle mb-0">
                    <thead>
                        <tr><th>Imagen</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th className="text-end">Subtotal</th></tr>
                    </thead>
                    <tbody>
                        {orden.productos.map((item) => (
                            <tr key={item.id}>
                                <td><img src={item.image} alt={item.name} style={{ width: 42, height: 42, objectFit: 'contain' }} /></td>
                                <td>{item.name}</td>
                                <td>{clp(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td className="text-end">{clp(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-end fw-bold">Total</td>
                            <td className="text-end fw-bold">{clp(orden.total)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminMostrarBoleta;
