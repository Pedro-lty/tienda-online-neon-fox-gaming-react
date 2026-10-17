import React from 'react';

export default function Campo({ label, error, ayuda, children }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      {children}
      {ayuda && !error && <div className="form-text">{ayuda}</div>}
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
}
