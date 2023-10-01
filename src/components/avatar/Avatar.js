import '@components/avatar/Avatar.scss';
import PropTypes from 'prop-types';

const Avatar = ({ avatarSrc, name, bgColor = '#f33e58', textColor, size, round = true }) => {
  const textSizeRatio = 1.7;
  const fontSize = Math.floor(size / textSizeRatio);
  const firstNameCharacter = name?.charAt(0);

  return (
    <>
      {!avatarSrc && (
        <div
          data-testid="avatar-container"
          className="avatar-container"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: round ? '50%' : '0px',
            backgroundColor: `${!avatarSrc ? bgColor : ''}`,
            display: 'flex'
          }}
        >
          {name && (
            <div
              style={{
                color: `${textColor}`,
                fontSize: `${fontSize}px`,
                margin: 'auto',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {firstNameCharacter}
            </div>
          )}
        </div>
      )}

      {avatarSrc && (
        <img
          src={avatarSrc}
          alt=""
          className="avatar-content avatar-container"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: round ? '50%' : '0px'
          }}
        />
      )}
    </>
  );
};

Avatar.propTypes = {
  avatarSrc: PropTypes.string,
  name: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.number,
  round: PropTypes.bool
};

export default Avatar;
