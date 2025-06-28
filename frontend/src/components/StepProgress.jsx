// StepProgress.jsx
import React from 'react';
import '../styles/modules/StepProgress.scss';

export default function StepProgress({ etapaAtual = 1 }) {
  const etapas = ['Inquilino', 'Pagamento', 'Comprovante'];

  return (
    <div className="step-progress">
      {etapas.map((etapa, index) => {
        const completed = etapaAtual > index + 1;
        const current = etapaAtual === index + 1;
        const isLast = index === etapas.length - 1;

        return (
          <div
            key={index}
            className={`step-wrapper ${completed ? 'completed' : ''} ${current ? 'current' : ''}`}
          >
            <div className="circle">
              {completed ? <i className="fas fa-check check" /> : null}
            </div>

            {!isLast && (
              <div className={`line ${completed ? 'completed' : ''}`} />
            )}

            <div className="label">{etapa}</div>
          </div>
        );
      })}
    </div>
  );
}
