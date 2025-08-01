import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faClockRotateLeft,
  faSun,
  faExpand,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/modules/Topbar.scss';

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{title}</span>
        <span className="topbar-separator">/</span>
        <span className="topbar-subtitle">{subtitle}</span>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Buscar..." />
        </div>

        <FontAwesomeIcon icon={faSun} className="topbar-action" title="Modo claro/escuro" />
        <FontAwesomeIcon icon={faClockRotateLeft} className="topbar-action" title="Histórico" />
        <FontAwesomeIcon icon={faBell} className="topbar-action" title="Notificações" />
        <FontAwesomeIcon icon={faExpand} className="topbar-action" title="Tela cheia" />

        <button className="logout-button" onClick={handleLogout} title="Sair">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
}
