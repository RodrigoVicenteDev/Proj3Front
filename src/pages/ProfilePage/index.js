import { useEffect, useState } from "react";
import style from "./style.module.css";
import { api } from "../../config/api";
import { Link } from "react-router-dom";
import EditarPerfil from "../PerfilEditar";

function ProfilePage() {
  const [usuario, SetUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const[reload, setReload]= useState(false)
  const [show, setShow] =useState(false)

  useEffect(() => {
    setLoading(false);
    async function fetchuser() {
      try {
        const response = await api.get("usuario/usuario/logado");
        SetUsuario(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(true);
    }
    fetchuser();
  }, [reload, show]);

async function deleteReceita(id){
  try {
    await api.delete(`/receita/deletar/${id}`)
  } catch (error) {
    console.log(error)
  }
  setReload(!reload)
}

async function deletefav(id){
  try {
    await api.put(`/receita/favoritos/excluir/${id}`)
  } catch (error) {
    console.log(error)
  }
  setReload(!reload)
}

  return (
    <>
    {show&& <EditarPerfil usuario={usuario} setUsuario={SetUsuario} show={show} setShow={setShow} />}
    
      <div className={style.container}>
        
        {loading && (
          <div style={{ display: "flex" }}>
            <img
              src={usuario.profilePic}
              style={{ width: "200px", borderRadius: "300px" }}
              alt="..."
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "50px",
              }}
            >
              <h1>{usuario.nome}</h1>
              <p>{usuario.email}</p>
            </div>
          </div>
        )}
        <div style={{display:"flex" ,justifyContent:"flex-end"}}>
        <svg onClick={()=>{setShow(!show)}} style={{color:"#4F46E5"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
</div>
      </div>

      <div className={style.container}>
        <h2>Minhas Receitas:</h2>
        {loading && (
          <table table class="table table-hover" style={{ margin: "20px" }}>
            <thead>
              <tr>
                <th style={{ padding: "20px" }}>Nome da Receita</th>
                <th style={{ padding: "20px" }}>Curtidas</th>
                <th style={{ padding: "20px" }}>Detalhes</th>
                <th style={{ padding: "20px" }}>Excluir Receita</th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                usuario.receitas.map((element) => {
                  return (
                    <tr>
                      <td style={{ padding: "20px" }}>
                        <p>{element.nome}</p>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <p>{element.favoritos} </p>
                      </td>

                      <td style={{ padding: "20px" }}>
                        <Link to={`/receita/detalhe/${element._id}`}>
                          <svg style={{color:"#4F46E5"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-richtext" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
  <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
</svg>
                        </Link>
                      </td>
                      <td style={{ padding: "20px" }}>
                        
                        <svg onClick={()=>{deleteReceita(element._id)}} style={{color:"red"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                        
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      <div className={style.container}>
        <h2>Minhas Receitas Favoritas:</h2>
        {loading && (
          <table table class="table table-hover" style={{ margin: "20px" }}>
            <thead>
              <tr>
                <th style={{ padding: "20px" }}></th>
                <th style={{ padding: "20px" }}> </th>
                <th style={{ padding: "20px" }}>Detalhes</th>
                <th style={{ padding: "20px" }}>Excluir dos favoritos</th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                usuario.favoritas.map((element) => {
                  return (
                    <tr>
                       <td style={{ padding: "0px" }}>
                       <div style={{width:"160px"}}> <img src={element.imagemurl} style={{heigth: "100%" }} /></div>
                      </td>

                      <td style={{ padding: "20px" }}>
                        <p>{element.nome}</p>
                      </td>
                     

                      <td style={{ padding: "20px" }}>
                        <Link to={`/receita/detalhe/${element._id}`}>
                        <svg style={{color:"#4F46E5"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-richtext" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
  <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
</svg>
                        </Link>
                      </td>
                      <td style={{ padding: "20px" }}>
                        
                        <svg onClick={()=>{deletefav(element._id)}} style={{color:"red" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                        
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        
      </div>
    </>
  );
}

export default ProfilePage;
