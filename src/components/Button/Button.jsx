import './Button.css';

function Button({ onClick }) {
  return (
    <div className="button-container">
      <button className="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default Button;
