import React from 'react';

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <div className="content-placeholder">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="placeholder-content">
        <div className="placeholder-icon">🚧</div>
        <p>Ta funkcjonalność jest w trakcie rozwoju.</p>
        <p>Wkrótce będzie dostępna w pełnej wersji.</p>
      </div>
    </div>
  );
};

export default Placeholder;
