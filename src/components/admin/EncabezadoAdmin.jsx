import React from 'react';
import { Link } from 'react-router-dom';

export default function EncabezadoAdmin({ titulo, subtitulo, volverA, children }) {
  return (
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
      <div>
        <h1 className="h3 mb-1">{titulo}</h1>
        {subtitulo && <p className="text-muted mb-0">{subtitulo}</p>}
      </div>
      <div className="d-flex gap-2">
        {children}
        {volverA && (
          <Link to={volverA} className="btn btn-outline-secondary">
            Volver
          </Link>
        )}
      </div>
    </div>
  );
}
