import React from 'react';
import './Home.scss';
import { Header } from '../../Layout/Header/Header';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <Header />
    </div>
  );
};
