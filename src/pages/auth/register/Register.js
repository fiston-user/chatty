import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './Register.scss';

const Register = () => {
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
            id="email"
            name="email"
            type="text"
            value=""
            labelText="Email"
            placeholder="Enter your email address"
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
        </div>
        <Button label={'SIGNUP'} className="auth-button button" disabled={true} />
      </form>
    </div>
  );
};

export default Register;
