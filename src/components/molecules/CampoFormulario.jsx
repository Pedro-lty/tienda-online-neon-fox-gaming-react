import React from 'react';

const CampoFormulario = ({ id, label, tipo = "text", valorDefecto, requerido = true }) => {
    return (
        <div className="grupo-formulario">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                type={tipo} 
                defaultValue={valorDefecto} 
                required={requerido} 
            />
        </div>
    );
};

export default CampoFormulario;