import React from 'react';
import styles from './FormField.module.scss';

export default function FormField({ id, label, type = 'text', ...props }) {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input type={type} id={id} className={styles.input} {...props} />
    </div>
  );
}