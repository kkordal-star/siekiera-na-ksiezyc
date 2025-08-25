import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/customerhero.svg`} alt="Customer Hero Logo" className="logo-image" />
      </div>
    </header>
  );
};

export default Header;
