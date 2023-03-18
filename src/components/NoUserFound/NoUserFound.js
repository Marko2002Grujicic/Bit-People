import {faFaceMeh} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NoUserFound.css'
export const NoUserFound = () => {
    return(
        <div className='noUserFound-container'>
            <FontAwesomeIcon icon={faFaceMeh} className="noUserFound"/>
            <span className='errorText'>We couldn't find any people matching your search</span>
        </div>
    )
}