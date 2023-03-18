import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import "./Search.css"

export const Search = ({searchQuery, setSearchQuery, isLoading, maleUsers, femaleUsers}) => {
    return (
        <>
        <div id="search-container" className={isLoading ? "hidden" : "active"}>
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input
            type="text"
            placeholder="Search users"
            id="search-input"
            value={searchQuery}
            onChange={(event) =>setSearchQuery(event.target.value)}
            />
        </div>
        <div className='counter'>
            <span>Male: {maleUsers}</span> 
            <span> Female: {femaleUsers} </span>
        </div>
        </>
        
    )
}