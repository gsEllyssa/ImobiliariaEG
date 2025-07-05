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
  faUserCircle,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/modules/Topbar.scss';

export default function Topbar({ icon, title, subtitle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <input type="text" placeholder="Search..." />
        </div>

        <FontAwesomeIcon icon={faSun} className="topbar-action" title="Light/Dark Mode" />
        <FontAwesomeIcon icon={faClockRotateLeft} className="topbar-action" title="History" />
        <FontAwesomeIcon icon={faBell} className="topbar-action" title="Notifications" />
        <FontAwesomeIcon icon={faExpand} className="topbar-action" title="Fullscreen" />

        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <span className="user-name">
            Hello, {user?.name?.split(' ')[0] || 'User'}
          </span>
        </div>

        <button className="logout-button" onClick={handleLogout} title="Logout">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
}
