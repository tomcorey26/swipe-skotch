import React from 'react';
import './Header.scss';
// in create-react-app relative paths for images dont work so you gotta
// import them
import Logo from '../../assets/logo-white.png';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const router = useHistory();
  return (
    <div className="header">
      <div className="logo-box">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">ChessMingle</span>
          <span className="heading-primary-sub">
            Multiplayer Chess With Video Chat
          </span>
        </h1>

        <button
          onClick={() => router.push(`/chess/${uuidv4()}`)}
          className="btn btn-white btn-animated"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};
