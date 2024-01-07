import { Blocks } from 'react-loader-spinner';
import './Spinner.css';

const Spinner = ({ isLoading }) => {
  return (
    <div className="spinner">
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={isLoading}
      />
    </div>
  );
};

export default Spinner;
