import {Link} from "react-router-dom"

function NavBar() {
    return ( 

        <>
<Link to="/usuario/signup" >SignIn</Link><br></br>
<Link to="/usuario/signup" >LogIn</Link><br></br>
<Link to="/receita/criar" >Criar Receita</Link>
        </>
     );
}

export default NavBar;