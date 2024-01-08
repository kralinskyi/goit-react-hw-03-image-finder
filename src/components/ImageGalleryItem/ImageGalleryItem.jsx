import { Component } from 'react';
import './ImageGalleryItem.css';
import Modal from 'components/Modal';
import { createPortal } from 'react-dom';

class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  keyDown = evt => {
    if (evt.code === 'Escape' && this.state.modalIsOpen) {
      this.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  closeModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props.image;
    const { modalIsOpen } = this.state;
    return (
      <>
        <li className="gallery-item">
          <img
            src={webformatURL}
            alt={webformatURL}
            className="gallery-item-image "
            onClick={() => this.closeModal()}
          />
        </li>
        {modalIsOpen &&
          createPortal(
            <Modal onClick={this.closeModal} url={largeImageURL} />,
            document.getElementById('modal-root')
          )}
      </>
    );
  }
}

export default ImageGalleryItem;
