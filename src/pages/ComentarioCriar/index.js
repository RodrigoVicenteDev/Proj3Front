import { api } from "../../config/api";
import { useState } from "react";

function ComentarioCriar({id}) {
  const [form, setForm] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
     
      await api.post(`/comentario/criar/${id}`, { ...form});
            
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700"> Escrever um comentario:</label>
        <textarea className="preparo mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"onChange={handleChange} name="content"></textarea>
        <label className="block text-sm font-medium text-gray-700">Avaliação:</label>
        <select className="preparo mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button style={{marginTop:"20px"}} className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit">Enviar</button>
      </form>
    </>
  );
}

export default ComentarioCriar;
