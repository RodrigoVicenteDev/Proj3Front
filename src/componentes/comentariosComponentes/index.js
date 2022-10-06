import RespostaCriar from "../../pages/ComentarioEditar/RespostaCriar";
import ComentariosEditar from "../../pages/ComentarioEditar";
import style from "./style.module.css";
import { useState } from "react";
function ComentariosComponente({
  idreceita,
  setComentarios,
  comentariosarray,
  reload,
  setReload,
}) {
  const [responder, setResponder] = useState(false);

  return (
    <>
      {comentariosarray.map((element) => {
        return (
          <div className={style.container} key={element._id}>
            <div style={{ display: "flex" }}>
              <div>
                <img
                  style={{
                    width: "100px",
                    borderRadius: "100px",
                    marginRight: "40px",
                    marginBottom: "10px",
                  }}
                  src={element.autor.profilePic}
                  alt="..."
                />
                <p>
                  <b>{element.autor.nome}</b>
                </p>
                <p>
                  <b> Nota: {element.avaliacao}</b>
                </p>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <b>Comentario:</b>
                <p>{element.content}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
             
            </div>
            {responder && (
              <RespostaCriar
                idcomentario={element._id}
                comentariosarray={comentariosarray}
                setComentarios={setComentarios}
              />
            )}

            <ComentariosEditar
              idcomentario={element._id}
              element={element}
              reload={reload}
              setReload={setReload}
            />
          </div>
        );
      })}
    </>
  );
}

export default ComentariosComponente;
