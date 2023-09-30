import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './Register.scss';

const Register = () => {
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
            id="email"
            name="email"
            type="text"
            value="jane.doe@user.fr"
            labelText="Email"
            placeholder="Enter email"
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
        </div>
        <Button label={'REGISTER'} className="auth-button button" disabled={false} handleChange={() => {}} />
      </form>
    </div>
  );
};

export default Register;
