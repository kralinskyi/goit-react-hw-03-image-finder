import './Modal.css';

const Modal = ({ url, onClick }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={url} alt={url} onClick={() => onClick()} />
      </div>
    </div>
  );
};

export default Modal;
