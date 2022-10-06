import { useEffect, useState } from "react";
import style from "./style.module.css";
import { api } from "../../config/api";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [usuario, SetUsuario] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, []);
  console.log(usuario);
  return (
    <>
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
      </div>

      <div className={style.container}>
        <h2>Minhas Receitas:</h2>
        {loading && (
          <table table class="table table-hover" style={{ margin: "20px" }}>
            <thead>
              <tr>
                <th style={{ padding: "20px" }}>Nome da Receita</th>
                <th style={{ padding: "20px" }}>Curtidas</th>
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
                          <button className="btn btn-primary">Detalhes</button>
                        </Link>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <Link to={`/tarefa/${element._id}`}>
                          <button className="btn btn-primary">Excluir</button>
                        </Link>
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
                <th style={{ padding: "20px" }}>Nome da Receita</th>
                <th style={{ padding: "20px" }}>Curtidas</th>
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
                          <button className="btn btn-primary">Detalhes</button>
                        </Link>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <Link to={`/receita/detalhe/${element._id}`}>
                          <button className="btn btn-primary">Excluir</button>
                        </Link>
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
