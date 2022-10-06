import { cloneElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";

function ComentariosEditar({ idcomentario, element, reload, setReload }) {
  const [comentario, setComentario] = useState({ ...element });
  const [editar, setEditar] = useState(false);

  const [logado, setLogado] = useState("");
  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem("loggedInUser");
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

    setLogado(parseLoggedInUser.user._id);
  }, []);
console.log(element)
  function handleChange(e) {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...comentario };
      delete clone._id;
      const editado = await api.put(
        `/comentario/editar/${idcomentario}`,
        clone
      );
      console.log(editado);
    } catch (error) {
      console.log(error);
    }
    setEditar(!editar);
    setReload(!reload);
    console.log(editar);
  }

  return (
    <>
      <>
        <button
          className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            setEditar(!editar);
          }}
        >
          Editar
        </button>
        {editar && (
          <form onSubmit={handleSubmit}>
            <label>Comentario:</label>
            <textarea
              className="preparo mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={comentario.content}
              onChange={handleChange}
              name="content"
            ></textarea>
            <label>Avaliação:</label>
            <select
              className="preparo mt-1 block   rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              name="avaliacao"
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button
              style={{ marginTop: "20px" }}
              className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Enviar
            </button>
          </form>
        )}
      </>
    </>
  );
}

export default ComentariosEditar;
