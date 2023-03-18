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
  const [results, setResults] = useState(true);

  const toggleLayout = () => {
    localStorage.setItem("layout", layout === "list" ? "grid" : "list");
    setLayout(layout === "list" ? "grid" : "list");
  };  

  const handleReload = () => {
    localStorage.setItem("layout", layout)
    window.location.reload();
  };

  useEffect(() => {
    setIsLoading(true)
    fetch('https://randomuser.me/api/?results=15')
    .then((response) => response.json())
    .then((data) => {
        setUsers(data.results);
        setIsLoading(false)
    });
}, []);

useEffect(() => {
  const newFilteredUsers = users.filter(user => user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || user.name.last.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
  if (newFilteredUsers.length === 0){
    setResults(true);
  }
  setFilteredUsers(newFilteredUsers);
}, [searchQuery, users]);

useEffect(() => {
  const storedLayout = localStorage.getItem("layout");
  if (storedLayout) {
    setLayout(storedLayout);
  };
}, []);

  return (
    <div className="App">
      <Header toggleLayout={toggleLayout} layout={layout}  setLayout={setLayout} handleReload={handleReload}></Header>
      <>
      {isLoading && <LoadingAnimation />}
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading ={isLoading}/>
        {results && <NoUserFound/>}
        {layout === "list" ? (<UsersList users={filteredUsers}/>) : (<UsersGrid users={filteredUsers}/>)}
      </>
      <Footer/>
    </div>
  );
}

export default App;
