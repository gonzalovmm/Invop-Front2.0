import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner animation="border" variant="info" className="loader-spinner" />
    </div>
  );
}

export default Loader;