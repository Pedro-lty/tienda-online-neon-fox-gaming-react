import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminMostrarBoleta = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Detalle de Boleta</h1>
                <a className="boton secundario" href="/admin/ordenes">Volver a Órdenes</a>
            </div>
            <section className="contenido">
                <p>Aquí se mostrará el detalle de los productos comprados, totales y datos del cliente.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminMostrarBoleta;