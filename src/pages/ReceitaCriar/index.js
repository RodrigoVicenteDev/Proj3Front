import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";

function Receitascriar() {
    const[reload,setReload] = useState(false)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    tempo: 0,
    dificuldade: "",
    porcoes: 0,
    ingredientes: [],
    preparo: [],
  });

  let [ingrediente, setIngrediente] = useState(["ingrediente", "ingrediente", "ingrediente"])
  let [preparo, setPreparo] =useState( ["preparo", "preparo", "preparo"])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function adicionaringrediente(e){
    e.preventDefault()
   setIngrediente([...ingrediente, "preparo"])
    
    
   
}

function adicionarpreparo(e){
    e.preventDefault()
   setPreparo([...preparo, "preparo"])
    console.log(preparo)
    
   
}

async function handleSubmit(e) {
    e.preventDefault();

let ingredientes = document.getElementsByClassName("ingrediente")
console.log(ingredientes)
ingrediente.forEach((element)=>{
    console.log(element)
})


    /* try {
      await api.post("/receita/criar", form);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    } */
  }


  return (
    <>
      <form onSubmit={handleSubmit} >
        <label>Nome:</label>
        <input
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
        />
        <label>Tempo de Preparo em min:</label>
        <input
          name="tempo"
          type="number"
          value={form.tempo}
          onChange={handleChange}
        />
        <label>dificuldade:</label>
        <select name="dificuldade" onChange={handleChange}>
          <option value="facil">facil</option>
          <option value="medio">médio</option>
          <option value="dificil">dificil</option>
        </select>
        <label>Porções:</label>
        <input
          name="porcoes"
          type="number"
          value={form.porcoes}
          onChange={handleChange}
        />

         <label>Ingredientes:</label>
        {ingrediente.map((element,index)=>{
            return(
                <input key={index}
          className="ingrediente"
          type="text"
          
          />
            )

        })}
        <button onClick={adicionaringrediente}>Adicionar +1 Ingrediente</button>

        <label>Passos:</label>
        {preparo.map((element,index)=>{
            return(
                <input key={index}
          className="preparo"
          type="text"
          
          />
            )

        })}
        <button onClick={adicionarpreparo}>Adicionar +1 passo ao preparo</button>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Receitascriar;
