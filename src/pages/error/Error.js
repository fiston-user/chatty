import Button from '@components/button/Button';
import { useNavigate } from 'react-router-dom';

import '@pages/error/Error.scss';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="oops">Oops!</div>
      <p className="not-found">The page you are looking for does not exist.</p>
      <Button label="Back Home" className="back-button button" handleClick={() => navigate(-1)} />
    </div>
  );
};

export default Error;
