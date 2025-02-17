import { useSelector } from 'react-redux';
import './style.scss';

const Preloader = () => {
  const { preloader_inv } = useSelector((state) => state.invoiceSlice);

  if (preloader_inv) {
    return (
      <div className="preloader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};
export default Preloader;
