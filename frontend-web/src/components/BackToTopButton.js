import React, { useState, useEffect } from 'react';
import './BackToTopButton.css';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top-container">
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top-button" title="Go to top">
          &uarr;
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;