import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReceitaEditar from "../ReceitaEditar";

function ReceitaDetalhe() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [receita, setReceita] = useState({})
  const [form, setForm] = useState({})

  useEffect(()=>{
    setLoading(false)
    async function fetchreceita(){
        try {
            const response = await api.get(`/receita/busca/${id}`)
            setReceita(response.data)
            setForm(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(true)
    }
    fetchreceita()
  },[])
console.log(receita)
  return (<>
  {loading&&(
    <>
  <h1>{receita.nome}</h1>
  <img src={receita.imagemurl} alt="..."/>
  <h3>{receita.autor.nome}</h3>
<h2>ingredientes</h2>
  <ul>
{receita.ingredientes.map((element)=>{
    return <li>{element}</li>
})}
  </ul>
  <h2>Modo de preparo</h2>
  <ul>
{receita.preparo.map((element)=>{
    return <li>{element}</li>
})}
  </ul>
</>
)}

<ReceitaEditar id={id} form={form} loading={loading} setForm={setForm}/>
  </>);
}

export default ReceitaDetalhe;
