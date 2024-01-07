import { IoSearchSharp } from 'react-icons/io5';
import './Searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const onSearchSubmit = e => {
    e.preventDefault();

    onSubmit(e.currentTarget.elements.searchQuery.value);

    e.currentTarget.elements.searchQuery.value = '';
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={onSearchSubmit}>
        <button type="submit" className="form-button">
          <span className="form-button-label">
            <IoSearchSharp />
          </span>
        </button>

        <input
          className="form-input"
          type="text"
          autoComplete="off"
          autoFocus
          name="searchQuery"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
