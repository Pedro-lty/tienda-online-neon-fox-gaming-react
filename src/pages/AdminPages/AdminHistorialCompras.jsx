import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminHistorialCompras = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Historial de Compras del Usuario</h1>
                <a className="boton secundario" href="/admin/mostrar-usuario">Volver al Usuario</a>
            </div>
            <section className="contenido">
                <p>Tabla que lista todas las compras realizadas por este usuario en particular.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminHistorialCompras;