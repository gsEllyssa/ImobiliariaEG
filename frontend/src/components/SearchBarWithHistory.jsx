import React from 'react';
import { useEffect, useState } from 'react';
import removeAccents from 'remove-accents';
import '../styles/modules/SearchBarWithHistory.scss';

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
      setHistory([tenant, ...history.slice(0, 2)]); // limit to 3
    }
    onSelect?.(tenant);
  };

  const finalList = search ? suggestions : history;

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <span className="icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="history-list">
        {finalList.length === 0 && (
          <li className="selected disabled">No tenants found</li>
        )}

        {finalList.map((tenant) => (
          <li
            key={tenant._id}
            className={tenant._id === selected?._id ? 'selected' : ''}
            onClick={() => handleSelect(tenant)}
          >
            <span className="clock-icon">🕒</span>
            <span className="name">{tenant.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
