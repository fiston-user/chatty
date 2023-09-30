import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './Login.scss';

const Login = () => {
  return (
    <div className="auth-inner">
      {/* <div className="alerts alert-error" role="alert">
        Error message
      </div> */}
      <form className="auth-form">
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value="Jane"
            labelText="Username"
            placeholder="Enter username"
          />
          <Input
            id="password"
            name="password"
            type="password"
            value="****"
            labelText="Password"
            placeholder="Enter password"
            handleChange={() => {}}
          />

          <label className="checkmark-container" htmlFor="checkbox">
            <Input id="checkbox" name="checkbox" type="checkbox" value={false} handleChange={() => {}} />
            Keep me signed in
          </label>
        </div>
        <Button label={'LOGIN'} className="auth-button button" disabled={false} handleChange={() => {}} />

        <Link to={'/forgot-password'}>
          <span className="forgot-password">
            Forgot password? <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
