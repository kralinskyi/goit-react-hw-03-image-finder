import ImageGalleryItem from 'components/ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className="imageGallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};

export default ImageGallery;
