import React from 'react';
import './Home.scss';
import { Header } from '../../components/Header/Header';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <Header />
    </div>
  );
};
