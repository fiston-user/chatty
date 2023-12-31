import Button from '@components/button/Button';
import Input from '@components/inputs/Input';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import '@pages/auth/register/Register.scss';
import { authService } from '@services/api/auth/auth.service';
import { Utils } from '@services/utils/utils.service';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState('');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });

      setLoggedIn(true);
      setStoredUsername(username);
      setAlertType('alert-success');
      Utils.dispatchUser(result, pageReload, dispatch, setUser);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessages(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) {
      if (user) navigate('/app/social/streams');
    }
  }, [loading, user, navigate]);

  return (
    <div className="auth-inner">
      {hasError && errorMessages && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessages}
        </div>
      )}
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter username"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeholder="Enter email"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setEmail(event.target.value)}
          />

          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter password"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />
      </form>
    </div>
  );
};

export default Register;
