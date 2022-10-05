import {Link} from "react-router-dom"

function NavBar() {
    return ( 

        <>
<Link to="/usuario/signup" >SignIn</Link><br></br>
<Link to="/login" >LogIn</Link><br></br>
<Link to="/receita/criar" >Criar Receita</Link>
<Link to="/paginaprincipal" >Pagina Principal</Link>
        </>
     );
}

export default NavBar;