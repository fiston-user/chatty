import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './Login.scss';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="auth-inner">
      {/* <div className="alerts alert-success" role="alert">
        login to your account.
      </div> */}
      <form className="auth-form">
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value=""
            labelText="Username"
            placeholder="Enter your username"
            handleChange={() => {}}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value=""
            labelText="Password"
            placeholder="Enter your password"
            handleChange={() => {}}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input id="checkbox" name="checkbox" type="checkbox" handleChange={() => {}} />
            Keep me signed in
          </label>
        </div>
        <Button label={'SIGNIN'} className="auth-button button" disabled={true} />

        <Link to="/forgot-password">
          <span className="forgot-password">
            Forgot password? <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
