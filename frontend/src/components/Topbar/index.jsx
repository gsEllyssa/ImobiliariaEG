// frontend/src/components/Topbar/index.jsx (VERSÃO ATUALIZADA)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Usando alias
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faClockRotateLeft,
  faSun,
  faExpand,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Topbar.module.scss'; // Importa os novos estilos

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.topbarContainer}>
      {/* Esquerda */}
      <div className={styles.breadcrumbs}>
        <span className={styles.title}>{title}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>

      {/* Direita */}
      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
        </div>

        <FontAwesomeIcon
          icon={faSun}
          className={styles.actionIcon}
          title="Modo claro/escuro"
        />
        <FontAwesomeIcon
          icon={faClockRotateLeft}
          className={styles.actionIcon}
          title="Histórico"
        />
        <FontAwesomeIcon
          icon={faBell}
          className={styles.actionIcon}
          title="Notificações"
        />
        <FontAwesomeIcon
          icon={faExpand}
          className={styles.actionIcon}
          title="Tela cheia"
        />

        <button onClick={handleLogout} title="Sair" className={styles.logoutButton}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
}