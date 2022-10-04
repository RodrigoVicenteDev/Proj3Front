import NavBar from './componentes/navBar';
import SigIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Receitascriar from './pages/ReceitaCriar';
import './App.css';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">

     <NavBar/>
     <Routes>
     <Route path="/usuario/signup" element={<SigIn/>}/>
     <Route path="/login" element={<LogIn/>}/>
     <Route path='/receita/criar' element={<Receitascriar/>}/>
     </Routes>

    </div>
  );
}

export default App;
