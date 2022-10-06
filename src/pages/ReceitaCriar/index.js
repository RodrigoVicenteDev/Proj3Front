import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css"

function Receitascriar() {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    tempo: 0,
    dificuldade: "",
    imagemurl:"",
    porcoes: 0,
    ingredientes: [],
    preparo: [],
  });

  let [ingrediente, setIngrediente] = useState([
    "ingrediente",
    "ingrediente",
    "ingrediente",
  ]);
  let [preparo, setPreparo] = useState(["preparo", "preparo", "preparo"]);

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

    let ingredientes = document.querySelectorAll(".ingrediente");

    for (let element of ingredientes) {
      form.ingredientes.push(element.value);
    }

    let passos = document.querySelectorAll(".preparo");

    for (let element of passos) {
      form.preparo.push(element.value);
    }

    try {
      await api.post("/receita/criar", form);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">Nome:</label>
        <input  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
        />

<label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">URL da Imagem:</label>
<p>Procure  na internet uma imagem bem bonita de sua receita e cole no campo abaixo:</p>
        <input  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="imagemurl"
          type="text"
          value={form.imagemurl}
          onChange={handleChange}
        />
        <label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">Tempo de Preparo em min:</label>
        <input  className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="tempo"
          type="number"
          value={form.tempo}
          onChange={handleChange}
        />
        <label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">dificuldade:</label>
        <select className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" name="dificuldade" onChange={handleChange}>
          <option value="facil">facil</option>
          <option value="medio">médio</option>
          <option value="dificil">dificil</option>
        </select>
        <label style={{ marginTop: "20px" }}className="block text-sm font-medium text-gray-700">Porções:</label>
        <input
         className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="porcoes"
          type="number"
          value={form.porcoes}
          onChange={handleChange}
        />

        <label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">Ingredientes:</label>
        {ingrediente.map((element, index) => {
          return <input  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ingrediente" key={index} type="text" />;
        })}
        <button style={{ marginTop: "20px" }} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={adicionaringrediente}>Adicionar +1 Ingrediente</button>

        <label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">Passos:</label>
        {preparo.map((element, index) => {
          return <input  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm preparo" key={index}  type="text" />;
        })}
        <button style={{ marginTop: "20px" }} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={adicionarpreparo}>
          Adicionar +1 passo ao preparo
        </button><br></br>
        <button style={{ marginTop: "20px" }} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit">Enviar</button>
      </form>
      </div>
    </>
  );
}

export default Receitascriar;
