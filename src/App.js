import NavBar from './componentes/navBar';
import SigIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Receitascriar from './pages/ReceitaCriar';
import PaginaPrincipal from './pages/Paginaprincipal';
import ReceitaDetalhe from './pages/receitaDetalhe';
import ComentariosEditar from './pages/ComentarioEditar';
import ProfilePage from './pages/ProfilePage';
import Footer from './componentes/footer';
import { useLocation } from 'react-router-dom';
import './App.css';
import {Routes, Route} from "react-router-dom"

function App() {
  console.log(window.location.pathname == "/")
  const { pathname } = useLocation();
  return (
    <div className="App">
    
  {pathname != "/" && <NavBar/> }
   
     <Routes>
     
     <Route path="/usuario/signup" element={<SigIn/>}/>
     <Route path="/" element={<LogIn/>}/>
     <Route path='/receita/criar' element={<Receitascriar/>}/>
     <Route path='/paginaprincipal' element={<PaginaPrincipal/>}/>
     <Route path="/receita/detalhe/:id" element={<ReceitaDetalhe/>}/>
     <Route path="/comentario/editar/:id" element={<ComentariosEditar/>}/>
     <Route path="/profile" element={<ProfilePage/>}/>
     </Routes>
       {pathname != "/" &&<Footer/> }
    </div>
  );
}

export default App;
