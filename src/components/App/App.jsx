import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import '../../styles.css';
import ImageGallery from 'components/ImageGallery';
import PixabayApi from 'components/Api/Api';
import Button from 'components/Button/Button';

class App extends Component {
  state = { gallery: [], searchQuery: '' };
  request = new PixabayApi();

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({ gallery: [] });
        this.request.resetPage();
        const images = await this.request.getPhotos(this.state.searchQuery);
        this.setState({ gallery: [...images.hits] });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleLoadMoreButton = async () => {
    try {
      const images = await this.request.getPhotos(this.state.searchQuery);

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...images.hits],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.gallery} />
        {this.state.gallery.length && (
          <Button onClick={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
}

export default App;
