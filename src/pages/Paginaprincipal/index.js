import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./style.module.css";

function PaginaPrincipal() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setloading] = useState(false);

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    setloading(false);
    async function fetchreceitas() {
      try {
        const response = await api.get("/receita/todas");
        setReceitas(response.data);
      } catch (error) {
        console.log(error);
      }
      setloading(true);
    }
    fetchreceitas();
  }, []);

  return (
    <>
      <div className={style.container}>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Todas as Receitas
        </h2>
        <form style={{ marginTop: "20px" }}>
          <label className="block text-sm font-medium text-gray-700">
            Buscar Receita:
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="imagemurl"
            type="text"
            onChange={handleChange}
          />
        </form>
        <div style={{ display: "flex" ,flexWrap:"wrap", marginTop: "20px" }}>
          {loading &&
            receitas

              .filter((element) => {
                return (
                  element.categoria.toLowerCase().includes(search.toLowerCase()) ||
                  element.nome.toLowerCase().includes(search.toLowerCase()) ||
                  element.dificuldade
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              })

              .map((element) => {
                return (
                  <Link
                    className="text-gray-900"
                    style={{ textDecoration: "none" }}
                    to={`/receita/detalhe/${element._id}`}
                  >
                    {" "}
                    <div
                      class="card"
                      style={{ width: " 18rem", margin: "20px" }}
                    >
                      <img
                        class="card-img-top"
                        src={element.imagemurl}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <div class="card-text">
                          <div>
                            <h5>{element.nome}</h5>
                          </div>
                          <p></p>
                          <div>
                            <p>
                              <b>Dificuldade :</b> {element.dificuldade}
                            </p>
                            <p>
                              <b>Porçoes:</b> {element.porcoes}
                            </p>
                            <p>
                              <b>Tempo de Preparo:</b> {element.tempo} min
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default PaginaPrincipal;
