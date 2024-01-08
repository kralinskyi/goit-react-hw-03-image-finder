import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import PixabayApi from 'components/Api/Api';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner';
import { Notify } from 'notiflix';
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
      this.setState({ isLoading: true, showLoadMore: false });

      try {
        this.setState({ gallery: [] });
        this.request.resetPage();
        const images = await this.request.getPhotos(this.state.searchQuery);

        if (images.total < this.request.per_page) {
          this.setState({ showLoadMore: false });
        } else {
          this.setState({ showLoadMore: true });
        }

        if (!images.total) {
          Notify.failure(`No such results like ${this.state.searchQuery}`);
        } else {
          Notify.success(
            `${images.total} results searching ${this.state.searchQuery}`
          );
        }

        this.setState({ gallery: [...images.hits] });
      } catch (error) {
        console.log(error);
        this.setState({ error });
        Notify.failure(`Something went wrong: ${error}`);
      } finally {
        this.setState({ isLoading: false });
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

      console.log(this.state.gallery.length);
      console.log(images.total);
      console.log(this.state.gallery.length < images.total);

      if (images.hits.length < this.request.per_page) {
        this.setState({ showLoadMore: false });
        Notify.warning(`That was all results..`);
      }
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
