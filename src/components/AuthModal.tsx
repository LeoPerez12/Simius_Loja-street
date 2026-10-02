import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthOpen, authView, setAuthView, closeAuth, login, signup, isAuthenticated, user, logout } =
    useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupError, setSignupError] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetDone, setResetDone] = useState(false);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeAuth();
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupPassword !== signupConfirm) {
      setSignupError('As senhas não coincidem.');
      return;
    }
    setSignupError('');
    signup(signupName, signupEmail, signupPassword);
  };

  const handleForgot = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForgotSent(true);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      setResetError('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setResetError('As senhas não coincidem.');
      return;
    }
    setResetError('');
    setResetDone(true);
  };

  const goToLoginFresh = () => {
    setForgotSent(false);
    setResetDone(false);
    setForgotEmail('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setResetError('');
    setAuthView('login');
  };

  return (
    <div className={`auth-overlay ${isAuthOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-label="Conta">
        <button className="modal-close" aria-label="Fechar" onClick={closeAuth}>
          ✕
        </button>

        <div className="auth-content">
          {isAuthenticated ? (
            <>
              <h2 className="auth-title">Olá, {user?.name}</h2>
              <p className="auth-subtitle">{user?.email}</p>
              <button
                className="btn btn-primary btn-block"
                onClick={() => {
                  logout();
                  goToLoginFresh();
                }}
              >
                Sair da conta
              </button>
            </>
          ) : authView === 'login' ? (
            <>
              <h2 className="auth-title">Entrar</h2>
              <form className="auth-form" onSubmit={handleLogin}>
                <label className="auth-label">
                  E-mail
                  <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </label>
                <label className="auth-label">
                  Senha
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </label>
                <button type="button" className="auth-link" onClick={() => setAuthView('forgot')}>
                  Esqueci minha senha
                </button>
                <button type="submit" className="btn btn-primary btn-block">
                  Entrar
                </button>
              </form>
              <p className="auth-switch">
                Não tem conta?{' '}
                <button type="button" onClick={() => setAuthView('signup')}>
                  Cadastre-se
                </button>
              </p>
            </>
          ) : authView === 'signup' ? (
            <>
              <h2 className="auth-title">Criar conta</h2>
              <form className="auth-form" onSubmit={handleSignup}>
                <label className="auth-label">
                  Nome
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </label>
                <label className="auth-label">
                  E-mail
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </label>
                <label className="auth-label">
                  Senha
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </label>
                <label className="auth-label">
                  Confirmar senha
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                  />
                </label>
                {signupError && <p className="auth-error">{signupError}</p>}
                <button type="submit" className="btn btn-primary btn-block">
                  Criar conta
                </button>
              </form>
              <p className="auth-switch">
                Já tem conta?{' '}
                <button type="button" onClick={() => setAuthView('login')}>
                  Entrar
                </button>
              </p>
            </>
          ) : authView === 'forgot' ? (
            <>
              <h2 className="auth-title">Recuperar senha</h2>
              {!forgotSent ? (
                <>
                  <p className="auth-subtitle">
                    Informe seu e-mail e enviaremos as instruções pra criar uma nova senha.
                  </p>
                  <form className="auth-form" onSubmit={handleForgot}>
                    <label className="auth-label">
                      E-mail
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </label>
                    <button type="submit" className="btn btn-primary btn-block">
                      Enviar instruções
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <p className="auth-subtitle">
                    Enviamos um e-mail para <strong>{forgotEmail}</strong>. Confirme pra criar sua nova senha.
                  </p>
                  <button className="btn btn-primary btn-block" onClick={() => setAuthView('reset')}>
                    Já confirmei, criar nova senha
                  </button>
                </>
              )}
              <p className="auth-switch">
                <button type="button" onClick={goToLoginFresh}>
                  Voltar para login
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-title">Nova senha</h2>
              {!resetDone ? (
                <form className="auth-form" onSubmit={handleReset}>
                  <label className="auth-label">
                    Nova senha
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label className="auth-label">
                    Confirmar nova senha
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                  </label>
                  {resetError && <p className="auth-error">{resetError}</p>}
                  <button type="submit" className="btn btn-primary btn-block">
                    Salvar nova senha
                  </button>
                </form>
              ) : (
                <>
                  <p className="auth-subtitle">Senha alterada com sucesso.</p>
                  <button className="btn btn-primary btn-block" onClick={goToLoginFresh}>
                    Ir para o login
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
