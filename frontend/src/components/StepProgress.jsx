import React from 'react';
import './StepProgress.scss';

export default function StepProgress({ etapaAtual = 1 }) {
  const etapas = ['Inquilino', 'Pagamento', 'Comprovante'];

  return (
    <div className="step-progress">
      {etapas.map((etapa, index) => (
        <div className="step-wrapper" key={etapa}>
          <div
            className={`circle ${etapaAtual > index ? 'completed' : ''} ${etapaAtual === index + 1 ? 'current' : ''}`}
          ></div>
          <span className="label">{etapa}</span>
          {index < etapas.length - 1 && <div className="line" />}
        </div>
      ))}
    </div>
  );
}
