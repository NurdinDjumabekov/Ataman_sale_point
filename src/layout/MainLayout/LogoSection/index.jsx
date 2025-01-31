import { Link, NavLink } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import config from 'config';

///// icons
import logo from '../../../assets/images/logo.png';

////// style
import './style.scss';

const LogoSection = () => {
  return (
    <NavLink to={config.defaultPath} className="logoMain">
      <div className="logoIcon">
        <div className="logo">
          <img src={logo} alt="logo" className="logoIcon" />
        </div>
        <div className="logoIcon__text">
          <p>Атаман</p>
          <span>Победитель вкуса</span>
        </div>
      </div>
    </NavLink>
  );
};

export default LogoSection;
