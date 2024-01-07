import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import '../../styles.css';
import ImageGallery from 'components/ImageGallery';
import PixabayApi from 'components/Api/Api';

class App extends Component {
  state = { gallery: [], searchQuery: '' };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        const request = new PixabayApi();
        const images = await request.getPhotos(this.state.searchQuery);
        this.setState({ gallery: [...images.hits] });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.gallery} />
      </div>
    );
  }
}

export default App;

{
  /* <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> і <Modal></Modal> */
}
