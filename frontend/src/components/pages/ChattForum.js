import { useEffect } from 'react';
import ChattComponent from '../Chatt/ChattComponent';

function ChattForum() {
  useEffect(() => {
    window.scrollTo({
      top: 10,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="App">
      <div className="container my-3">
        <ChattComponent />
      </div>
    </div>
  );
}

export default ChattForum;
