import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ url, onClick }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={url} alt={url} onClick={() => onClick()} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
