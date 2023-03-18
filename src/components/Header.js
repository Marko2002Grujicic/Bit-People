import './Header&Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

export const Header = ({toggleLayout, layout ,handleReload }) => {

  return (
    <header>
      <h1>BIT People</h1>
      <div className='header-icons'>
        <button onClick={handleReload}>
        <FontAwesomeIcon icon={faArrowRotateRight} className="view-icon"/>
        </button>
        <button onClick={toggleLayout}>
        <FontAwesomeIcon className="view-icon" icon={layout === "list" ? faTh : faThList} />
        </button>
      </div>
    </header>
  );
};
