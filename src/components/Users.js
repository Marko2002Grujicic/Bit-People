import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faCake, faSearch} from '@fortawesome/free-solid-svg-icons';
import './Users.css'
import './Search.css'
import { LoadingAnimation } from "./LoadingAnimation/LoadingAnimation";

export const Users = () => {
    const [users,setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        fetch('https://randomuser.me/api/?results=15')
        .then((response) => response.json())
        .then((data) => {
            setUsers(data.results);
            setIsLoading(false)
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

    const checkGender = (user) => {
        let className = ""
        if (user.gender === 'female'){
            className = 'female';
        }
        return className;
    }
    const filteredUsers = users.filter((user) => 
    user.name.first.toLowerCase().includes(searchText.toLowerCase()) || user.name.last.toLowerCase().includes(searchText.toLocaleLowerCase())
    
  );
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

    return (
        <>
        {isLoading && <LoadingAnimation />}
            <div id="search-container" className={isLoading ? "hidden" : "active"}>
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                    <input
                    type="text"
                    placeholder="Search users"
                    id="search-input"
                    value={searchText}
                    onChange={handleSearch}
                    />
            </div>
                <div className="container" id="container">
                {filteredUsers.map(user => (
                <div key={user.email} className={`userProfile ${checkGender(user)}`} id="userProfile">
                    <img src={user.picture.large} alt="user" className="image"/>
                        <div className="userInfo">
                            <span>Name: {user.formatedUsername}</span>
                            <span><FontAwesomeIcon icon={faEnvelope} className="icon"/>Email: {user.hiddenEmail}</span>
                            <span><FontAwesomeIcon icon={faCake} className="icon"/> {new Date(user.dob.date).toLocaleDateString("en-GB")}</span>
                        </div>
                </div>
                ))}
            </div>
        </>
        
        
    )
}