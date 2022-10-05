import RespostaCriar from "../../pages/ComentarioEditar/RespostaCriar";
import ComentariosEditar from "../../pages/ComentarioEditar";
import style from "./style.module.css"
import { useState } from "react";
function MapComentarios({ idreceita, setComentarios, comentariosarray}) {
  const[editar , setEditar] = useState(false)
  const[responder, setResponder] = useState(false)
    return (  


        <>
          {comentariosarray.map((element)=>{
           return (<div className={style.container} key={element._id}>
              <b>Comentario:</b><p>{element.content}</p>
              <b>Autor:</b><p>{element.autor.nome}</p>
              <p>{element.avaliacao}</p>
              <button className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=>{setEditar(!editar)}}>Editar</button>
              {editar&&
              <ComentariosEditar idcomentario={element._id} element={element}/>}
             
<button className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=>{setResponder(!editar)}}>Responder</button>
{responder&&
<RespostaCriar idcomentario={element._id} comentariosarray={comentariosarray} setComentarios={setComentarios} />}
            </div>)

          })}
         </>
    );
}

export default MapComentarios;