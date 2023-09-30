import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ id, name, type, value, className, labelText, placeholder, handleChange, style }) => {
  return (
    <div className="form-row">
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        style={style}
        onChange={handleChange}
        placeholder={placeholder}
        className={`form-input ${className}`}
        autoComplete="false"
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object
};

export default Input;
