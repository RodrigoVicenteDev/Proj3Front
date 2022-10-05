import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
function ReceitaEditar({ id, form, setForm, loading }) {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [alteraring, setAlteraring] = useState(false);
  const [alterarprep, setAlterarprep] = useState(false);

 
  let [ingrediente, setIngrediente] = useState([]);
  let [preparo, setPreparo] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function adicionaringrediente(e) {
    e.preventDefault();
    setIngrediente([...ingrediente, "ingrediente"]);
  }

  function adicionarpreparo(e) {
    e.preventDefault();
    setPreparo([...preparo, "preparo"]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let ingredientes = document.querySelectorAll(".ingredienteadd");

    for (let element of ingredientes) {
      if (!form.ingredientes.includes(element.value)) {
        form.ingredientes.push(element.value);
      }
    }

    let passos = document.querySelectorAll(".preparoadd");

    for (let element of passos) {
      if (!form.preparo.includes(element.value)) {
        form.preparo.push(element.value);
      }
    }
    console.log(form);
    /* try {
          await api.post("/receita/criar", form);
        } catch (error) {
          console.log(error);
        } */
  }

  function alteraringrediente(e) {
    form.ingredientes[e.target.name] = e.target.value;
    
  }

  function alterarpreparo(e) {
    form.preparo[e.target.name] = e.target.value;
    
  }

  return (
    <>
      {loading && (
        <form onSubmit={handleSubmit}>
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
          <ul>
            <b onClick={() => setAlteraring(!alteraring)}>Alterar Ingredientes</b>
            <br></br>
            {form.ingredientes.map((element, index) => {
              return (
                <li>
                  <input
                    key={index}
                    className="ingrediente"
                    type="text"
                    value={element}
                    name={index}
                  />
                  {alteraring && (
                    <input
                      type="text"
                      name={index}
                      onChange={alteraringrediente}
                    />
                  )}
                </li>
              );
            })}
            </ul>
            <h1>Adicionar mais ingredientes <button onClick={adicionaringrediente}>Adicionar +1 Ingrediente</button></h1>
            <ul>
              {ingrediente.map((element, index)=>{
                return <li><input key={index} className="ingredienteadd" type="text" /></li>
              })}
            </ul>
          
          <ul>
          <b onClick={() => setAlterarprep(!alterarprep)}>Alterar Preparo</b>
            <br></br>
            {form.preparo.map((element, index) => {
              return (
                <li>
                  <input
                    key={index}
                    className="preparo"
                    type="text"
                    value={element}
                    name={index}
                  />
                  {alterarprep && (
                    <input
                      type="text"
                      name={index}
                      onChange={alterarpreparo}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <h1>Adicionar mais passos de preparo <button onClick={adicionarpreparo}>Adicionar +1 passo</button></h1>
            <ul>
              {preparo.map((element, index)=>{
                return <li><input key={index} className="preparoadd" type="text" /></li>
              })}
            </ul>
          <button type="submit">Concluir alteração</button>
        </form>
      )}
    </>
  );
}

export default ReceitaEditar;
