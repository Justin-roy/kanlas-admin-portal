import React from 'react';
import '../styles/Error.css';

function ErrorComponent({ message }) {
  return (
    <div className="alert">
      <span className="alert-icon">⚠️</span>
      {message}
    </div>
  );
}

export default ErrorComponent;
