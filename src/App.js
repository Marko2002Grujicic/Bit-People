import { Header } from './components/Header';
import './App.css';
import { UsersList } from './components/UsersList';
import { UsersGrid } from './components/UserGrid';
import { Footer } from './components/Footer';
import { useState, useEffect } from 'react';
import { LoadingAnimation } from "./components/LoadingAnimation/LoadingAnimation";
import { Search } from './components/Search/Search';
import { NoUserFound } from './components/NoUserFound/NoUserFound';

function App() {
  const [layout, setLayout] = useState("list");
  const [searchQuery, setSearchQuery] = useState('');
  const [users,setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState([]);
  // Loads the State values for Male and Female users from local storage if there are no saved values the state is set at 0;
  const [maleUsers, setMaleUsers] = useState(() => {
    const value = localStorage.getItem("maleUsers");
    return value !== null ? parseInt(value) : 0;
  });
  const [femaleUsers, setFemaleUsers] = useState(() => {
    const value = localStorage.getItem("femaleUsers");
    return value !== null ? parseInt(value) : 0;
  });

  useEffect(() => {
    localStorage.setItem("maleUsers", maleUsers.toString());
    localStorage.setItem("femaleUsers", femaleUsers.toString());
  }, [maleUsers,femaleUsers])

  const toggleLayout = () => {
    localStorage.setItem("layout", layout === "list" ? "grid" : "list");
    setLayout(layout === "list" ? "grid" : "list");
  };  

  const handleReload = () => {
    setIsLoading(true);
    setFemaleUsers(0);
    setMaleUsers(0);
    localStorage.setItem("layout", layout)
    fetch("https://randomuser.me/api/?results=15")
    .then((response) => response.json())
    .then((data) => {
    setUsers(data.results);
    genderCounter();
    localStorage.setItem("users", JSON.stringify(data.results))})
    setLastFetchTime(Date.now());
    localStorage.setItem("lastFetchTime", Date.now());
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true)
    const storedUsers = localStorage.getItem('users');
    const storedFetchTime = localStorage.getItem("lastFetchTime");

    if (storedUsers){
      setUsers(JSON.parse(storedUsers));
      setLastFetchTime(storedFetchTime)
      setIsLoading(false);
      
    }else{
      fetch('https://randomuser.me/api/?results=15')
      .then((response) => response.json())
      .then((data) => {
          setUsers(data.results);
          genderCounter();
          localStorage.setItem("users", JSON.stringify(data.results));
          setLastFetchTime(Date.now());
          localStorage.setItem("lastFetchTime", Date.now());
          setIsLoading(false)
          
      });
    }
    
}, []);

useEffect(() => {
  const newFilteredUsers = users.filter(user => user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || user.name.last.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
  setFilteredUsers(newFilteredUsers);
}, [searchQuery, users]);

useEffect(() => {
  const storedLayout = localStorage.getItem("layout");
  if (storedLayout) {
    setLayout(storedLayout);
  };
}, []);

const getElapsedTime = (date) => {
  const diff = Date.now() - date;
  const seconds = 60 * 1000;
  const minute = 60 * seconds;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diff < minute) {
    return "Just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  } else if (diff < 2 * month) {
    return "Over a month ago";
  } else {
    const months = Math.floor(diff / month);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }
};

const elapsedTime = lastFetchTime && getElapsedTime(lastFetchTime);

const genderCounter = () => {
  users.forEach((user) => {
    if (user.gender === 'male'){
      setMaleUsers((prevState => prevState + 1))
    }else{
      setFemaleUsers((prevState => prevState+1));
    }
  })
}

  return (
    <div className="App">
      <Header toggleLayout={toggleLayout} layout={layout}  setLayout={setLayout} handleReload={handleReload}></Header>
      <>
      {isLoading && <LoadingAnimation />}
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading ={isLoading} maleUsers={maleUsers} femaleUsers={femaleUsers}/>
        {!filteredUsers.length && <NoUserFound/>}
        {layout === "list" ? (<UsersList users={filteredUsers}/>) : (<UsersGrid users={filteredUsers} />)}
      </>
      <Footer elapsedTime={elapsedTime}/>
    </div>
  );
}

export default App;
