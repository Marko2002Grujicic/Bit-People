import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faCake} from '@fortawesome/free-solid-svg-icons';


export const Users = () => {
    const [users,setUsers] = useState([]);

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=15')
        .then((response) => response.json())
        .then((data) => {
            setUsers(data.results)
        });
    }, []);

    const hideEmail = (email) => {
        const atIndex = email.indexOf("@");
        const username = email.slice(0, atIndex);
        const domain = email.slice(atIndex);
        const hiddenUsername = username.slice(0,3) + "..." + username.slice(-3);
        return hiddenUsername + domain
    }
    
    users.forEach(user => {
        user.hiddenEmail = hideEmail(user.email);
    });

    return (
        <div className="container">
            {users.map(user => (
            
                <div key={user.email} className="userProfile">
                        <div className="userInfo">
                            <span><FontAwesomeIcon icon={faEnvelope} className="icon"/>Email: {user.hiddenEmail}</span>
                        </div>
                </div>
            ))}
        </div>
    )
}