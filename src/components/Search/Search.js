import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css'

export const Search = ({users, checkGender}) => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText === '') {
            setResults([]);
          } else {
        const filteredUsers = users.filter((user) =>
          user.name.first.toLowerCase().includes(searchText.toLowerCase())
        );
        setResults(filteredUsers);
          }
      }, [searchText, users]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div id="search-container">
      <FontAwesomeIcon icon={faSearch} className="icon" />
      <input
        type="text"
        placeholder="Search users"
        id="search-input"
        value={searchText}
        onChange={handleSearch}
      />
      <div>
        {results.map((user) => (
          <div key={user.email} className={`userProfile`}> 
            {user.name.first} {user.name.last}
          </div>
        ))}
      </div>
    </div>
  );
};
