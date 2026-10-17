import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import CategoriaForm from '../../components/admin/CategoriaForm';
import { getCategoria, guardarCategoria } from '../../services/adminData';

const AdminEditarCategoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const categoria = getCategoria(id);

    if (!categoria) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Categoría no encontrada" volverA="/admin/categorias" />
                <p>La categoría que buscas no existe o fue eliminada.</p>
            </PlantillaAdmin>
        );
    }

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Editar categoría" subtitulo={categoria.nombre} volverA="/admin/categorias" />
            <CategoriaForm
                inicial={categoria}
                textoBoton="Guardar cambios"
                onSubmit={(datos) => {
                    const r = guardarCategoria({ ...datos, id: categoria.id });
                    if (r.ok) navigate('/admin/categorias');
                    return r;
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminEditarCategoria;
