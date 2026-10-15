import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminEditarProducto = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <div>
                    <p className="saludo">Productos</p>
                    <h1>Editar producto</h1>
                </div>
                <a className="boton secundario" href="/admin/productos">Volver</a>
            </div>
            <form className="formulario">
                <div className="grupo-formulario">
                    {/* En React se usa htmlFor en lugar de for */}
                    <label htmlFor="nombre">Nombre del producto</label>
                    {/* Se debe usar defaultValue en lugar de value, y cerrar la etiqueta con /> */}
                    <input id="nombre" type="text" defaultValue="Teclado" required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="categoria">Categoría</label>
                    {/* El atributo selected se reemplaza por defaultValue en la etiqueta select */}
                    <select id="categoria" defaultValue="Periféricos" required>
                        <option value="Periféricos">Periféricos</option>
                        <option value="Monitores">Monitores</option>
                        <option value="Audio">Audio</option>
                    </select>
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="precio">Precio</label>
                    <input id="precio" type="number" defaultValue="49990" min="0" required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" type="number" defaultValue="10" min="0" required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="descripcion">Descripción</label>
                    {/* En React, el texto del textarea va en el defaultValue */}
                    <textarea id="descripcion" rows="4" defaultValue="Teclado ..."></textarea>
                </div>
                <button className="boton" type="submit">Guardar cambios</button>
            </form>
        </PlantillaAdmin>
    );
};

export default AdminEditarProducto;