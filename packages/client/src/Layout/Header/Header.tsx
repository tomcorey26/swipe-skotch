import React from 'react';
import './Header.scss';
// in create-react-app relative paths for images dont work so you gotta
// import them
import Logo from '../../assets/logo-white.png';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="header">
      <div className="logo-box">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};
