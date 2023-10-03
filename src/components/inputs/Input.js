import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import './Input.scss';

// const Input = ({ id, name, type, value, className, labelText, placeholder, handleChange, style }) => {
//   return (
//     <div className="form-row">
//       {labelText && (
//         <label htmlFor={name} className="form-label">
//           {labelText}
//         </label>
//       )}
//       <input
//         id={id}
//         name={name}
//         type={type}
//         value={value}
//         style={style}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className={`form-input ${className}`}
//         autoComplete="false"
//       />
//     </div>
//   );
// };

const Input = forwardRef((props, ref) => (
  <div className="form-row">
    {props.labelText && (
      <label htmlFor={name} className="form-label">
        {props.labelText}
      </label>
    )}
    <input
      ref={ref}
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      style={props.style}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      className={`form-input ${props.className}`}
      autoComplete="false"
    />
  </div>
));

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object
};

export default Input;
