import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import UsuarioForm from '../../components/admin/UsuarioForm';
import { getUsuario, guardarUsuario, getSesion } from '../../services/adminData';

const AdminEditarUsuario = () => {
    const { id } = useParams(); // el id es el correo
    const navigate = useNavigate();
    const usuario = getUsuario(id);

    if (!usuario) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Usuario no encontrado" volverA="/admin/usuarios" />
                <p>El usuario que buscas no existe o fue eliminado.</p>
            </PlantillaAdmin>
        );
    }

    const sesion = getSesion();
    const esPropio = sesion?.email?.toLowerCase() === usuario.email.toLowerCase();

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Editar usuario" subtitulo={usuario.email} volverA="/admin/usuarios" />
            <UsuarioForm
                inicial={{
                    nombre: usuario.nombre || '',
                    apellido: usuario.apellido || '',
                    email: usuario.email,
                    role: usuario.role || 'Cliente',
                    estado: usuario.estado || 'Activo',
                    password: ''
                }}
                bloquearRol={esPropio}
                textoBoton="Guardar cambios"
                onSubmit={(datos) => {
                    const r = guardarUsuario(datos, usuario.email);
                    if (r.ok) navigate('/admin/usuarios');
                    return r;
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminEditarUsuario;
