import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/images/background.jpg';
import Button from '../../../components/button/Button';
import Input from '../../../components/inputs/Input';
import './ForgotPassword.scss';

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
                {/* <div className="alerts alert-error" role="alert">
						  Error message
						</div> */}
                <form className="auth-form">
                  <div className="form-input-container">
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
                  <Button
                    label={'FORGOT PASSWORD'}
                    className="auth-button button"
                    disabled={false}
                    handleChange={() => {}}
                  />

                  <Link to={'/'}>
                    <span className="forgot-password">
                      <FaArrowLeft className="arrow-right" /> back to login?
                    </span>
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
