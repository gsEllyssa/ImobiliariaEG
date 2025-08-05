import React from 'react';

export default function StepProgress({ etapaAtual = 1 }) {
  const etapas = ['Inquilino', 'Pagamento', 'Comprovante'];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 flex justify-between relative flex-wrap gap-y-6 md:flex-nowrap md:gap-0">
      {etapas.map((etapa, index) => {
        const completed = etapaAtual > index + 1;
        const current = etapaAtual === index + 1;
        const isLast = index === etapas.length - 1;

        return (
          <div
            key={index}
            className={`relative flex flex-col items-center flex-1 text-center`}
          >
            {/* Círculo */}
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all
                ${completed ? 'bg-blue-600 border-blue-600' : current ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}
            >
              {completed ? (
                <i className="fas fa-check text-white text-sm" />
              ) : null}
            </div>

            {/* Linha de conexão */}
            {!isLast && (
              <div
                className={`absolute top-4 left-1/2 h-0.5 -translate-y-1/2 w-[calc(100%+16px)] z-0 transform 
                ${completed ? 'bg-blue-600' : 'bg-gray-300'} hidden md:block`}
              />
            )}

            {/* Label */}
            <div className="mt-2 text-xs text-gray-800">{etapa}</div>
          </div>
        );
      })}
    </div>
  );
}
