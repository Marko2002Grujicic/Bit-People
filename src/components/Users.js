import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faCake} from '@fortawesome/free-solid-svg-icons';
import './Users.css'

export const Users = () => {
    const [users,setUsers] = useState([]);


    useEffect(() => {
        fetch('https://randomuser.me/api/?results=15')
        .then((response) => response.json())
        .then((data) => {
            setUsers(data.results);
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
        user.formatedUsername = `${user.name.first} ${user.name.last}`;
    });

    const gender = (user) => {
        let className = ""
        if (user.gender === 'female'){
            className = 'female';
        }
        return className;
    }

    return (
        <div className="container" id="container">
            {users.map(user => (
                <div key={user.email} className={`userProfile ${gender(user)}`} id="userProfile">
                    <img src={user.picture.large} alt="user" className="image"/>
                        <div className="userInfo">
                            <span>Name: {user.formatedUsername}</span>
                            <span><FontAwesomeIcon icon={faEnvelope} className="icon"/>Email: {user.hiddenEmail}</span>
                            <span><FontAwesomeIcon icon={faCake} className="icon"/> {new Date(user.dob.date).toLocaleDateString("en-GB")}</span>
                        </div>
                </div>
            ))}
        </div>
    )
}