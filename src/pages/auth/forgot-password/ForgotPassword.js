import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './ForgotPassword.scss';
import backgroundImage from '../../../assets/images/background.jpg';

const ForgotPassword = () => {
  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                <form className="auth-form">
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value=""
                      labelText="Email"
                      placeholder="Enter your email"
                      handleChange={() => {}}
                    />
                  </div>
                  <Button label={'FORGOT PASSWORD'} className="auth-button button" disabled={true} />

                  <Link to="/">
                    <span className="forgot-password">Back to login</span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
