import './Header&Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

export const Header = () => {
    const [isGrid, setIsGrid] = useState(false);

    useEffect(() => {
    const container = document.querySelector('#container');
    const userProfile = document.querySelectorAll('.userProfile');
    const icon = document.querySelector('.view-icon');

    if (isGrid) {
      container.classList.add('grid-layout');
      userProfile.forEach((element) => {
        element.classList.add('grid-userProfile');
      });
      icon.classList.add('fas', 'fa-th');
      icon.classList.remove('fa-th-list');
    } else {
      container.classList.remove('grid-layout');
      userProfile.forEach((element) => {
        element.classList.remove('grid-userProfile');
      });
      icon.classList.remove('fas', 'fa-th');
      icon.classList.add('fa-th-list');
    }
  }, [isGrid]);

  const handleClick = () => {
    setIsGrid((prevIsGrid) => !prevIsGrid);
  }


  const restartClickHandler = () => {

  }

  return (
    <header>
      <h1>BIT People</h1>
      <div className='header-icons'>
        <button onClick={restartClickHandler}>
        <FontAwesomeIcon icon={faArrowRotateRight} className="view-icon"/>
        </button>
        <button onClick={handleClick}>
        <FontAwesomeIcon className="view-icon" icon={isGrid ? faTh : faThList} />
        </button>
        
      </div>
        
  
    </header>
  );
};
