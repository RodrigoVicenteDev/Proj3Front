import NavBar from './componentes/navBar';
import SigIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Receitascriar from './pages/ReceitaCriar';
import PaginaPrincipal from './pages/Paginaprincipal';
import ReceitaDetalhe from './pages/receitaDetalhe';
import ComentariosEditar from './pages/ComentarioEditar';
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
     <Route path='/paginaprincipal' element={<PaginaPrincipal/>}/>
     <Route path="/receita/detalhe/:id" element={<ReceitaDetalhe/>}/>
     <Route path="/comentario/editar/:id" element={<ComentariosEditar/>}/>
     </Routes>

    </div>
  );
}

export default App;
