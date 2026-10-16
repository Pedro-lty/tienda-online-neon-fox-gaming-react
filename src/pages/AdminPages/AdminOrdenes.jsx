import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminOrdenes = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Gestión de Órdenes y Boletas</h1>
                <p>Aquí se listarán todas las compras realizadas.</p>
            </div>
            <section className="contenido">
                {/* Aquí irá la tabla de órdenes */}
                <a className="boton" href="/admin/mostrar-boleta">Ver ejemplo de boleta</a>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminOrdenes;