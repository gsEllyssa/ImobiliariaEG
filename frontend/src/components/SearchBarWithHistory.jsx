import React, { useEffect, useState } from 'react';
import removeAccents from 'remove-accents';

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
    <div className="w-full max-w-md">
      <div className="relative">
        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-sm text-gray-500">🔍</span>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md bg-gray-100 text-sm text-gray-700 outline-none"
        />
      </div>

      <ul className="mt-2 bg-gray-100 rounded-md overflow-hidden">
        {finalList.length === 0 && (
          <li className="px-4 py-2 text-sm text-gray-400 cursor-default">No tenants found</li>
        )}

        {finalList.map((tenant) => (
          <li
            key={tenant._id}
            className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-200 
              ${tenant._id === selected?._id ? 'bg-gray-300 font-semibold text-gray-800' : 'text-gray-500 hover:bg-gray-200'}`}
            onClick={() => handleSelect(tenant)}
          >
            <span className="text-xs mr-2">🕒</span>
            <span>{tenant.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
