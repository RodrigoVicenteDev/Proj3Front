import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

function PaginaPrincipal() {
    const [receitas, setReceitas] = useState([])
    const [loading , setloading] = useState(false)


    useEffect(()=>{
        setloading(false)
        async function fetchreceitas(){
            try {
                const response = await api.get("/receita/todas")
                setReceitas(response.data)
            } catch (error) {
                console.log(error)
            }
            setloading(true)
        }
        fetchreceitas()
    },[])

    return ( 

        <>
        {loading&& (
            receitas.map((element)=>{
                return (
                    <div class="card" style={{width: "18rem"}}>
  <img src={element.imagemurl} style={{width: "18rem"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{element.nome}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link to={`/receita/detalhe/${element._id}`}><button>Detalhes</button></Link>
  </div>
</div>
                )

            })
        )}
        </>
     );
}

export default PaginaPrincipal;