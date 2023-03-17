import './Header&Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

export const Header = ({handleReload }) => {
    const [isGrid, setIsGrid] = useState(false);

    const handleClick = () => {
      const container = document.querySelector('#container');
      const userProfile = document.querySelectorAll('.userProfile');
      const icon = document.querySelector('.view-icon');
  
      if (isGrid) {
        container.classList.remove('grid-layout');
        userProfile.forEach((profile) => profile.classList.remove('grid-userProfile'));
        icon.classList.add('fa-th-list');
        setIsGrid(false);
        
      } else {
        container.classList.add('grid-layout');
        userProfile.forEach((profile) => profile.classList.add('grid-userProfile'));
        icon.classList.remove('fa-th-list');
        setIsGrid(true);
        
      }
    }

  return (
    <header>
      <h1>BIT People</h1>
      <div className='header-icons'>
        <button onClick={handleReload}>
        <FontAwesomeIcon icon={faArrowRotateRight} className="view-icon"/>
        </button>
        <button onClick={handleClick}>
        <FontAwesomeIcon className="view-icon" icon={isGrid ? faTh : faThList} />
        </button>
        
      </div>
        
  
    </header>
  );
};
