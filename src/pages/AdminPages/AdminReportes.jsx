import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { getOrdenes, getProductos, clp, STOCK_CRITICO } from '../../services/adminData';

const AdminReportes = () => {
    const productos = getProductos();
    const ordenes = getOrdenes().filter((o) => o.estado !== 'Cancelada');

    const ingresos = ordenes.reduce((s, o) => s + o.total, 0);
    const ticket = ordenes.length ? Math.round(ingresos / ordenes.length) : 0;

    const porProducto = {};
    const porCategoria = {};
    let unidades = 0;

    ordenes.forEach((o) =>
        o.productos.forEach((item) => {
            const subtotal = item.price * item.quantity;
            unidades += item.quantity;

            const fila = porProducto[item.id] || { nombre: item.name, unidades: 0, ingresos: 0 };
            fila.unidades += item.quantity;
            fila.ingresos += subtotal;
            porProducto[item.id] = fila;

            const cat = productos.find((p) => String(p.id) === String(item.id))?.categoria || 'Sin categoría';
            const filaCat = porCategoria[cat] || { unidades: 0, ingresos: 0 };
            filaCat.unidades += item.quantity;
            filaCat.ingresos += subtotal;
            porCategoria[cat] = filaCat;
        })
    );

    const topProductos = Object.values(porProducto).sort((a, b) => b.unidades - a.unidades).slice(0, 10);
    const categorias = Object.entries(porCategoria).sort((a, b) => b[1].ingresos - a[1].ingresos);
    const criticos = productos.filter((p) => p.stock <= STOCK_CRITICO).length;

    const tarjetas = [
        { titulo: 'Ingresos', valor: clp(ingresos) },
        { titulo: 'Órdenes válidas', valor: ordenes.length },
        { titulo: 'Ticket promedio', valor: clp(ticket) },
        { titulo: 'Unidades vendidas', valor: unidades },
        { titulo: 'Productos con stock crítico', valor: criticos }
    ];

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Reportes" subtitulo="Calculados con las órdenes registradas (sin contar las canceladas)." />

            <div className="row g-3 mb-4">
                {tarjetas.map((t) => (
                    <div className="col-6 col-lg" key={t.titulo}>
                        <div className="bg-white rounded shadow-sm p-3 h-100">
                            <div className="text-muted small">{t.titulo}</div>
                            <div className="h4 mb-0">{t.valor}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                <div className="col-lg-7">
                    <div className="bg-white rounded shadow-sm p-3">
                        <h2 className="h5">Productos más vendidos</h2>
                        <table className="table mb-0">
                            <thead><tr><th>Producto</th><th>Unidades</th><th className="text-end">Ingresos</th></tr></thead>
                            <tbody>
                                {topProductos.length === 0 && (
                                    <tr><td colSpan="3" className="text-center text-muted py-3">Sin ventas registradas todavía.</td></tr>
                                )}
                                {topProductos.map((p) => (
                                    <tr key={p.nombre}><td>{p.nombre}</td><td>{p.unidades}</td><td className="text-end">{clp(p.ingresos)}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="bg-white rounded shadow-sm p-3">
                        <h2 className="h5">Ventas por categoría</h2>
                        <table className="table mb-0">
                            <thead><tr><th>Categoría</th><th>Unidades</th><th className="text-end">Ingresos</th></tr></thead>
                            <tbody>
                                {categorias.length === 0 && (
                                    <tr><td colSpan="3" className="text-center text-muted py-3">Sin ventas registradas todavía.</td></tr>
                                )}
                                {categorias.map(([nombre, d]) => (
                                    <tr key={nombre}><td>{nombre}</td><td>{d.unidades}</td><td className="text-end">{clp(d.ingresos)}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminReportes;
