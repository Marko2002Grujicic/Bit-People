import { Header } from './components/Header';
import './App.css';
import { Users } from './components/Users';
import { Footer } from './components/Footer';

function App() {
  const handleReload = () => {
    window.location.reload();
  };


  return (
    <div className="App">
      <Header  handleReload={handleReload}></Header>
      <Users ></Users>
      <Footer/>
    </div>
  );
}

export default App;
