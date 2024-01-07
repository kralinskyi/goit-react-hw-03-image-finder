import './ImageGalleryItem.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        alt={image.largeImageURL}
        className="gallery-item-image "
      />
    </li>
  );
};

export default ImageGalleryItem;
