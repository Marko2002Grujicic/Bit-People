import './Header&Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'



export const Header = ({toggleLayout, layout ,handleReload }) => {

  return (
    <>
    <header>
          <h1><Link className='styled' to="/main">BIT People</Link></h1>
          <div className='header-icons'>
            <button className='view-icon'><Link className='styled' to="/about">About</Link></button>
            <button onClick={handleReload}>
            <FontAwesomeIcon icon={faArrowRotateRight} className="view-icon"/>
            </button>
            <button onClick={toggleLayout}>
            <FontAwesomeIcon className="view-icon" icon={layout === "list" ? faTh : faThList} />
            </button>
         </div>
      </header>
      
    </>
      
        
    
      
  );
};
