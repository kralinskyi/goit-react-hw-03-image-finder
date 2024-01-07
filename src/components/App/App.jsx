import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import '../../styles.css';
import ImageGallery from 'components/ImageGallery';
import PixabayApi from 'components/Api/Api';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner';
// import Modal from 'components/Modal';

class App extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    isLoading: false,
    showLoadMore: false,
  };

  request = new PixabayApi();

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ isLoading: true });

      try {
        this.setState({ gallery: [] });
        this.request.resetPage();
        const images = await this.request.getPhotos(this.state.searchQuery);
        if (images.lengts < this.request.per_page) {
          this.setState({ showLoadMore: false });
        }

        this.setState({ gallery: [...images.hits], showLoadMore: false });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false, showLoadMore: false });
      }
    }
  }

  handleLoadMoreButton = async () => {
    this.setState({ isLoading: true });
    try {
      const images = await this.request.getPhotos(this.state.searchQuery);

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...images.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
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
        <Spinner isLoading={this.state.isLoading} />
        {this.state.showLoadMore && (
          <Button onClick={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
}

export default App;
