import { Header } from './components/Header';
import './App.css';
import { Users } from './components/Users';


function App() {
  const handleReload = () => {
    window.location.reload();
  };


  return (
    <div className="App">
      <Header  handleReload={handleReload}></Header>
      <Users ></Users>
      
    </div>
  );
}

export default App;
