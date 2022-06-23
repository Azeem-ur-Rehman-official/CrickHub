import { ThreeDots } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className="loading">
      <ThreeDots
        heigth="100"
        width="100"
        ariaLabel="loading"
        className="Loading"
        // color="#007bff"
        color="#23AF79"
      />
    </div>
  );
};

export default Loader;
