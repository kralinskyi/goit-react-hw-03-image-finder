import { IoSearchSharp } from 'react-icons/io5';
import './Searchbar.css';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const onSearchSubmit = e => {
    e.preventDefault();

    const currentSearch = e.currentTarget.elements.searchQuery.value.trim();

    if (currentSearch === '') {
      Notify.failure(`Please wrigth something.`);
      return;
    }

    onSubmit(currentSearch);

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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
