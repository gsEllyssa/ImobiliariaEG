// frontend/src/components/SearchBarWithHistory/index.jsx (VERSÃO ATUALIZADA)
import React, { useEffect, useState } from 'react';
import removeAccents from 'remove-accents';
import classnames from 'classnames'; // Importa a biblioteca para classes condicionais
import styles from './SearchBarWithHistory.module.scss'; // Importa os novos estilos

export default function SearchBarWithHistory({ tenants = [], onSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  const normalize = (text) =>
    typeof text === 'string' ? removeAccents(text.toLowerCase().trim()) : '';

  useEffect(() => {
    const filtered = tenants.filter((t) =>
      normalize(t.nome).includes(normalize(search))
    );
    setSuggestions(search ? filtered : []);
  }, [search, tenants]);

  const handleSelect = (tenant) => {
    setSelected(tenant);
    setSearch('');
    if (!history.find((h) => h._id === tenant._id)) {
      setHistory([tenant, ...history.slice(0, 2)]);
    }
    onSelect?.(tenant);
  };

  const finalList = search ? suggestions : history;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {(search || history.length > 0) && (
        <ul className={styles.suggestionsList}>
          {finalList.length === 0 && search && (
            <li className={styles.noSuggestions}>Nenhum inquilino encontrado</li>
          )}

          {finalList.map((tenant) => (
            <li
              key={tenant._id}
              className={classnames(styles.suggestionItem, {
                // Aplica a classe '--selected' se o ID do inquilino for o mesmo do selecionado
                [styles['suggestionItem--selected']]: tenant._id === selected?._id,
              })}
              onClick={() => handleSelect(tenant)}
            >
              <span className={styles.icon}>🕒</span>
              <span>{tenant.nome}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}