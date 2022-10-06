import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
function ReceitaEditar({ id, form, setForm, loading, show, setShow }) {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  let [ingrediente, setIngrediente] = useState([]);
  let [preparo, setPreparo] = useState([]);
  const [editForm, setEditForm] = useState({ ...form });
  function handleChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }
  
  function handleIngredients(e, index) {
    const clone = [...ingrediente];
    clone[index] = e.target.value;
    setIngrediente(clone);
  }
  function handlePreparo(e, index) {
    const clone = [...preparo];
    clone[index] = e.target.value;
    setPreparo(clone);
  }
  function adicionarpreparo(e) {
    e.preventDefault();
    setPreparo([...preparo, ""]);
  }
  function adicionaringrediente(e) {
    e.preventDefault();
    setIngrediente([...ingrediente, ""]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...editForm };
    clone.ingredientes = [...clone.ingredientes, ...ingrediente];
    clone.preparo = [...clone.preparo, ...preparo];
    delete clone._id;
    console.log(clone)
    try {
      await api.put(`/receita/editar/${id}`, clone);
    } catch (error) {
      console.log(error);
    }
    setShow(!show)
  }
  function alteraringrediente(e) {
    const clone = { ...editForm }; // clono o state pra poder alterar ele diretamente
    clone.ingredientes[e.target.name] = e.target.value; //altero o state
    setEditForm({ ...clone }); // set o clone alterado pro state
  }
  function alterarpreparo(e) {
    const clone = { ...editForm };
    clone.preparo[e.target.name] = e.target.value;
    setEditForm({ ...clone });
  }
  function handleDeleteEditForm(e) {
    const clone = { ...editForm };
    clone.ingredientes.splice(e.target.name, 1);
    setEditForm(clone);
  }
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Receita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700">
                Nome:
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="nome"
                type="text"
                value={editForm.nome}
                onChange={handleChange}
              />

              <label className="block text-sm font-medium text-gray-700">
                Imagem URL:
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="imagemurl"
                type="text"
                value={editForm.imagemurl}
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-gray-700">
                Tempo de Preparo em min:
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="tempo"
                type="number"
                value={editForm.tempo}
                onChange={handleChange}
              />

<label style={{ marginTop: "20px" }} className="block text-sm font-medium text-gray-700">Categoria:</label>
        <select className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" name="categoria" onChange={handleChange}>
          <option value="Acompanhamentos e Entradas">Acompanhamentos e Entradas</option>
          <option value="Arroz e Risotos">Arroz e Risotos</option>
          <option value="Bolos e Tortas Doces">Bolos e Tortas Doces</option>
          <option value="Carne Suína">Carne Suína</option>
          <option value="Carnes">Carnes</option>
          <option value="Frangos e Aves">Frangos e Aves</option>
          <option value="Acompanhamentos e Entradas">Acompanhamentos e Entradas</option>
          <option value="Lanches">Lanches</option>
          <option value="Massas">Massas</option>
          <option value="Peixes e Frutos do Mar">Peixes e Frutos do Mar</option>
          <option value="Sobremesas">Sobremesas</option>
          <option value="Sopas">Sopas</option>
        </select>


              <label className="block text-sm font-medium text-gray-700">
                dificuldade:
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="dificuldade"
                onChange={handleChange}
              >
                <option value="facil">facil</option>
                <option value="medio">médio</option>
                <option value="dificil">dificil</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">
                Porções:
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="porcoes"
                type="number"
                value={editForm.porcoes}
                onChange={handleChange}
              />
              <ul>
                <b>Alterar Ingredientes</b>
                <br></br>
                {editForm.ingredientes.map((element, index) => {
                  return (
                    <li style={{ display: "flex" }}>
                      <input
                        className=" ingrediente mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        key={index}
                        type="text"
                        value={element}
                        name={index}
                        onChange={alteraringrediente}
                      />
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={handleDeleteEditForm}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>

              <ul>
                {ingrediente.map((element, index) => {
                  return (
                    <li style={{ display: "flex" }}>
                      <input
                        key={index}
                        className="ingredienteadd mt-1  w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        value={element}
                        onChange={(e) => handleIngredients(e, index)}
                      />
                      <button
                        style={{ marginLeft: "10px" }}
                        Click={handleDeleteEditForm}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={adicionaringrediente}
              >
                Adicionar +1 Ingrediente
              </button>
              <ul>
                <b>Alterar Preparo</b>
                <br></br>
                {editForm.preparo.map((element, index) => {
                  return (
                    <li style={{ display: "flex" }}>
                      <input
                        key={index}
                        className="preparo mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        value={element}
                        name={index}
                        onChange={alterarpreparo}
                      />
                      <button
                        style={{ marginLeft: "10px" }}
                        Click={handleDeleteEditForm}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>

              <ul>
                {preparo.map((element, index) => {
                  return (
                    <>
                      <li style={{ display: "flex" }}>
                        <input
                          key={index}
                          className="preparoadd  w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="text"
                          value={element}
                          onChange={(e) => handlePreparo(e, index)}
                        />
                        <button style={{ marginLeft: "10px" }}>x</button>
                      </li>
                    </>
                  );
                })}
              </ul>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={adicionarpreparo}
              >
                Adicionar +1 passo
              </button>
              <button
                style={{ marginTop: "20px" }}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Concluir alteração
              </button>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between"></Modal.Footer>
      </Modal>
    </>
  );
}
export default ReceitaEditar;
