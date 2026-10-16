import React from 'react';

const CampoSelect = ({ id, label, opciones, valorDefecto, requerido = true }) => {
    return (
        <div className="grupo-formulario">
            <label htmlFor={id}>{label}</label>
            <select id={id} defaultValue={valorDefecto} required={requerido}>
                {/* Recorremos el arreglo de opciones para generar los <option> dinámicamente */}
                {opciones.map((opcion, index) => (
                    <option key={index} value={opcion.valor}>
                        {opcion.texto}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CampoSelect;