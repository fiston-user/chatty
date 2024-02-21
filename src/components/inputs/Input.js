import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ id, name, type, value, className, labelText, placeholder, handleChange, style }) => {
  return (
    <>
      <div className="form-row">
        {labelText && (
          <label htmlFor={name} className="form-label">
            {labelText}
          </label>
        )}

        <input
          id={id}
          type={type}
          name={name}
          value={value}
          className={`form-input ${className}`}
          style={style}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="false"
        />
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  labelText: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object
};

export default Input;
