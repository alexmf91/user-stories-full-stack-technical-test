import React from 'react';

import beLikeLogo from '../../assets/belike-logo.PNG';

import './Header.scss';

export default function Header() {
  return (
    <header>
      <img src={beLikeLogo} alt="belike-logo-img" />
      <span>Header Works</span>
    </header>
  );
}
