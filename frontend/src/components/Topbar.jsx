import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faClockRotateLeft,
  faSun,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/modules/Topbar.scss';

export default function Topbar({ icon, title, subtitle }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <FontAwesomeIcon icon={icon} className="topbar-icon" />
        <span className="topbar-title">{title}</span>
        <span className="topbar-separator">/</span>
        <span className="topbar-subtitle">{subtitle}</span>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Pesquisar" />
        </div>
        <FontAwesomeIcon icon={faSun} className="topbar-action" title="Modo Claro/Escuro" />
        <FontAwesomeIcon icon={faClockRotateLeft} className="topbar-action" title="Histórico" />
        <FontAwesomeIcon icon={faBell} className="topbar-action" title="Notificações" />
        <FontAwesomeIcon icon={faExpand} className="topbar-action" title="Fullscreen" />
      </div>
    </div>
  );
}
