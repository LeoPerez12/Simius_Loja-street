import { useAuth } from '../context/AuthContext';

export default function AccountButton() {
  const { isAuthenticated, user, openAuth } = useAuth();

  const initials = user?.name?.trim().charAt(0).toUpperCase() ?? '';

  return (
    <button
      className="account-btn"
      aria-label={isAuthenticated ? `Conta de ${user?.name}` : 'Logar ou Criar sua Conta'}
      onClick={() => openAuth('login')}
    >
      {isAuthenticated ? (
        <span className="account-initials">{initials}</span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 20c0-3.6 3.58-6 8-6s8 2.4 8 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
