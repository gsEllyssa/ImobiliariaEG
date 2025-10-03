import React from 'react';
import classnames from 'classnames';
import styles from './StepProgress.module.scss';

export default function StepProgress({ etapaAtual = 1 }) {
  const etapas = ['Inquilino', 'Pagamento', 'Comprovante'];

  return (
    <div className={styles.progressContainer}>
      {etapas.map((etapa, index) => {
        const stepNumber = index + 1;
        const completed = etapaAtual > stepNumber;
        const current = etapaAtual === stepNumber;
        const isLast = index === etapas.length - 1;

        return (
          <div
            key={index}
            className={classnames(styles.step, {
              [styles['step--completed']]: completed,
              [styles['step--current']]: current,
            })}
          >
            {/* Círculo (agora com uma classe estática) */}
            <div className={styles.circle}>
              {completed && <i className={classnames('fas fa-check', styles.checkIcon)} />}
            </div>

            {/* Linha de conexão (agora com uma classe estática) */}
            {!isLast && <div className={styles.line} />}

            {/* Label */}
            <div className={styles.label}>{etapa}</div>
          </div>
        );
      })}
    </div>
  );
}